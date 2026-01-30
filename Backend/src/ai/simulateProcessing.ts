import { updateJob } from "../jobs/jobstore"

export function simulateAIProcessing(jobId: string) {
 
  setTimeout(() => {
    updateJob(jobId, {
      status: "done",
      result: {
        enhancedImageUrl:
          "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
        title: "Handcrafted Ceramic Vase",
        description:
          "Beautiful handmade ceramic vase featuring traditional patterns and earthy tones. Each piece is unique, crafted by skilled rural artisans using time-honored techniques passed down through generations.",
        price: "$45.00"
      }
    })

    console.log(`✅ Job ${jobId} processed`)
  }, 5000) 
}
