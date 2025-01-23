// global.d.ts
export {}

declare global {
  // augmenting global object
  // We allow globalThis._mongoose to be any or a Promise
  var _mongoose: Promise<typeof import("mongoose")> | undefined
}
