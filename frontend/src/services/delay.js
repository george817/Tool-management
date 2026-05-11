export const delay = (min = 300, max = 800) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

