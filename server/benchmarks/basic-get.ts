import autocannon from "autocannon"
import dotenv from "dotenv"

dotenv.config()

const startBench = () => {
  const port = process.env.PORT || 5000
  const url = `http://localhost:${port}/api/v1`

  const args = process.argv.slice(2)
  const numConnections = Number(args[0] || 100)
  const duration = Number(args[1] || 10)

  const instance = autocannon(
    {
      url,
      connections: numConnections,
      duration,
      headers: {
        "content-type": "application/json"
      },
      requests: [
        {
          method: "GET",
          path: "/feed"
        }
      ]
    },
    finishedBench
  )

  autocannon.track(instance)
}

function finishedBench(err, res) {
  if (err) {
    console.log("Benchmark error:", err)
  } else {
    console.log("Benchmark finished:", res)
  }
}

startBench()
