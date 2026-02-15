import { Ratelimit } from "@upstash/ratelimit";
import redis from "./redis";

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "120 s"),
})

export default ratelimit;