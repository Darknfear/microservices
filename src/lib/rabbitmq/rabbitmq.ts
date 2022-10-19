import { Connection, connect, Channel } from "amqplib";
import { CreateEx, PublishEx } from "common/interfaces/rabbit";
import { pull, find, once } from "lodash";

export default class MessageBroker {
  private static instance: MessageBroker;
  private connection: Connection;
  private channel: Channel;
  private queues: any;
  private exchange: string;

  private constructor() {
    this.queues = {};
    this.init();
  }

  private async init() {
    this.connection = await connect({
      hostname: "localhost",
      port: 5672,
    });
    this.channel = await this.connection.createChannel();
  }

  async createEx({ name, type, durable }: CreateEx): Promise<this> {
    if (!this.connection) await this.init();
    await this.channel.assertExchange(name, type, { durable });
    this.exchange = name;
    return this;
  }

  /**
   * Send message to an exchange
   * @param {Object} - object defining exchange and routingKey
   * @param {Object} msg Message as Buffer
   */
  async publish({ ex, routingKey }: PublishEx, message: string): Promise<this> {
    const queue = `${ex}.${routingKey}`;
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.bindQueue(queue, ex, routingKey);
    return this;
  }

  /**
   * @param {Object} - object defining queue name and bindingKey
   * @param {Function} handler Handler that will be invoked with given message and acknowledge function (msg, ack)
   */
  async subscribe({ exchange, bindingKey }: { exchange: any, bindingKey: any }, handler: any) {
    const queue = `${exchange}.${bindingKey}`;
    if (!this.connection) {
      await this.init();
    }
    if (this.queues[queue]) {
      const existingHandler = find(this.queues[queue], (h) => h === handler);
      if (existingHandler) {
        return () => this.unsubscribe(queue, existingHandler);
      }
      this.queues[queue].push(handler);
      return () => this.unsubscribe(queue, handler);
    }

    await this.channel.assertQueue(queue, { durable: true });
    this.channel.bindQueue(queue, exchange, bindingKey);
    this.queues[queue] = [handler];
    this.channel.consume(queue, async (msg: any) => {
      const ack = once(() => this.channel.ack(msg));
      this.queues[queue].forEach((h: any) => h(msg, ack));
    });
    return () => this.unsubscribe(queue, handler);
  }

  async unsubscribe(queue: any, handler: any) {
    pull(this.queues[queue], handler);
  }

  public static createInstance() {
    if (!this.instance) {
      this.instance = new MessageBroker();
    }
    return this.instance;
  }
}
