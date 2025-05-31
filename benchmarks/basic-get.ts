import autocannon from "autocannon"
import dotenv from "dotenv"
import log from "../src/logger/log"

dotenv.config()

const startBench = () => {
  const port = process.env.PORT || 5000
  const url = `http://localhost:${port}`

  const args = process.argv.slice(2)
  const numConnections = Number(args[0] || 100)
  const duration = Number(args[1] || 10)

  const instance = autocannon(
    {
      url,
      connections: numConnections, // plural: connections
      duration: duration,          // how long to run in seconds
      headers: {
        "content-type": "application/json",
      },
      requests: [
        {
          method: "GET",
          path: "/",
        },
      ],
    },
    finishedBench
  )

  autocannon.track(instance)
}

function finishedBench(err: Error | null, res: autocannon.Result) {
  if (err) {
    console.log("Benchmark error:", err)
  } else {
    console.log("Benchmark finished:", res)
  }
}

startBench()
