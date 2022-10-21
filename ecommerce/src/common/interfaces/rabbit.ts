export class CreateEx {
  name: string;
  type: string;
  durable?: boolean = true;
}

export class PublishEx {
  ex: any;
  routingKey: string;
}
