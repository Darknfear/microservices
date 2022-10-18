import bodyParser from "body-parser";
import express, { Express } from "express";
import initialDB from "../databases/postgres.database";
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

    // Connect to db
    await initialDB();
  }
}
