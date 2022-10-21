import bodyParser from "body-parser";
import express, { Express } from "express";
import MessageBroker from "../lib/rabbitmq/rabbitmq";
import initialDB from "../databases/postgres.database";
import router from "./routes/route";
import customConsumer from "../lib/rabbitmq/consumer";
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.bootstrap();
  }

  public start(): void {
    const port = process.env.PORT || 3000;

    this.app.listen(port, () => {
      console.log("Server listening on port: " + port);
    });
  }

  private async bootstrap(): Promise<void> {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    //initial message broker
    MessageBroker.createInstance();

    // customConsumer();

    // route
    this.app.use(router)
    this.app.use((req, res, next) => {
      next();
    });

    // process.on("SIGINT", async () => {
    //   console.log('process');
    //   process.exit(1);
    // });
    // process.on("exit", (code) => {
    //   RMQProducer.channel.close();
    //   RMQProducer.connection.close();
    // });

    // Connect to db
    await initialDB();
  }
}
