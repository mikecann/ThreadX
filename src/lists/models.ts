// import { makeAutoObservable } from "mobx";
// import { Id } from "../../convex/_generated/dataModel";
// import { api } from "../../convex/_generated/api";
// import { generateShortID } from "../common/misc/misc";
//
// export type ListMessageDoc = (typeof api.messages.list)["_returnType"][number];
//
// export class ListModel {
//   id: Id<"lists"> | null = null;
//   messages: MessageModel[];
//   name: string;
//
//   constructor(options: { messages?: MessageModel[] } = {}) {
//     this.messages = options.messages ?? [];
//     this.name = "All Threads";
//     makeAutoObservable(this);
//   }
//
//   get key() {
//     return this.id?.toString() ?? generateShortID();
//   }
//
//   get isLocalOnlyList(): boolean {
//     return this.id == null;
//   }
//
//   updateMessages(messages: ListMessageDoc[]) {}
// }
//
// export class MessageModel {
//   //replies: MessageModel[];
//
//   constructor() {
//     makeAutoObservable(this);
//   }
//
//   get key() {
//     return generateShortID();
//   }
// }

export {};
