import { Router } from 'express';
import { producer } from "../../lib/rabbitmq/producer";
import MessageBroker from '../../lib/rabbitmq/rabbitmq';
import { EXCHANGE, BINDING_KEY } from "../../common/constants/rabbitmq.constants";
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const RMQProducer = MessageBroker.createInstance();
    await producer(RMQProducer, { message: Buffer.from('hahahahaha'), routingKey: BINDING_KEY });
  } catch (error) {
   process.exit(1); 
  }
});

router.get("/a", async (req, res, next) => {
  try {
    const RMQProducer = MessageBroker.createInstance();
    await producer(RMQProducer, {
      message: Buffer.from("hahahahaha"),
      routingKey: BINDING_KEY,
    });
  } catch (error) {
    process.exit(1);
  }
});

export default router;
