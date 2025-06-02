// This is the structure Gemini expects for its 'history' array
const geminiExpectedHistory = [
  {
    role: "user",
    parts: [{ text: "Hello, I want to negotiate a deal." }],
  },
  {
    role: "model",
    parts: [{ text: "Great! What are you looking for?" }],
  },
  {
    role: "user",
    parts: [{ text: "I need 2 posts for $10,000." }],
  },
]

console.log(JSON.stringify(geminiExpectedHistory, null, 2))

// Example of a single message part
const singleMessagePart = {
  text: "This is a message part.",
}

// Example of a full Content object
const contentObject = {
  role: "user",
  parts: [singleMessagePart],
}

console.log("\nExample of a single Content object:")
console.log(JSON.stringify(contentObject, null, 2))
