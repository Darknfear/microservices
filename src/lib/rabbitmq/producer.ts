import MessageBroker from "./rabbitmq";
import { EXCHANGE } from "../../common/constants/rabbitmq.constants";

export const producer = async (
  instance: MessageBroker,
  { message, routingKey }: { message: any; routingKey: any }
) => {
  console.log(message, routingKey);
  try {
    await instance.createEx({ name: EXCHANGE, type: "direct" });
    await instance.publish({ ex: EXCHANGE, routingKey}, message);
    return Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
