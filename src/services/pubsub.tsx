export type MessageHandler<M> = (message: M)=>void

export interface PubSub<M>{
     subscribe(handler:MessageHandler<M>):void     
     unsubscribe():void
}