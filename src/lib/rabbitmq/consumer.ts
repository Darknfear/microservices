import MessageBroker from "./rabbitmq";
import { EXCHANGE } from "../../common/constants/rabbitmq.constants";

const consumer = MessageBroker.createInstance();

const handleMessage = (...data: any[]) => {
  console.log(data);
}
await (async () => {
   try {
    //  const consumer = MessageBroker.createInstance();
     await consumer.createEx({
       name: EXCHANGE,
       type: "direct",
     });
     consumer.subscribe(
       { exchange: process.env.EXCHANGE, bindingKey: process.env.BINDING_KEY },
       handleMessage
     );
   } catch (error) {
     console.log(error);
   }
})();

process.on('exit', () => {
  console.log('exit');
})
