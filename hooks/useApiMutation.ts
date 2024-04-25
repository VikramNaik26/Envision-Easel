import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutation = (mutataionFunction: any) => {
  const [pending, setPending] = useState(false)
  const apiMutation = useMutation(mutataionFunction)

  const mutate = (payload: any) => {
    setPending(true)
    apiMutation(payload)
      .finally(() => setPending(false))
      .then((data) => data)
      .catch((err) => {
        throw err
      })
  }
  return { mutate, pending }
}
