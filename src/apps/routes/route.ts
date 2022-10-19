import { Router } from 'express';
import { producer } from "../../lib/rabbitmq/producer";
import MessageBroker from '../../lib/rabbitmq/rabbitmq';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const RMQProducer = MessageBroker.createInstance();
    // console.log(RMQProducer)
    await producer(RMQProducer, { message: 'debug', routingKey: ''});
  } catch (error) {
   process.exit(1); 
  }
});

export default router;
