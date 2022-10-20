import MessageBroker from "./rabbitmq";
import {
  EXCHANGE,
  BINDING_KEY,
} from "../../common/constants/rabbitmq.constants";

// const consumer = MessageBroker.createInstance();

const handleMessage = (...data: any[]) => {
  console.log('data', data);
}
const customConsumer = async () => {
   try {
    const consumer = MessageBroker.createInstance();
    console.log("consumer", consumer);
     await consumer.createEx({
       name: EXCHANGE,
       type: "direct",
     });
     consumer.subscribe(
       { exchange: EXCHANGE, bindingKey: BINDING_KEY },
       handleMessage
     );
   } catch (error) {
     console.log(error);
   }
};
export default customConsumer;
process.on('exit', () => {
  console.log('exit');
})
