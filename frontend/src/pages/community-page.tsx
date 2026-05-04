// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { Navbar } from "@/components/landing/navbar";
// import { Footer } from "@/components/landing/footer";
// import { ParticleBackground } from "@/components/landing/particle-background";



// type TabType = "blogs" | "videos" | "events";

// export function CommunityPage() {
//   const [likedBlogs, setLikedBlogs] = useState<number[]>([]);
//   const [likedVideos, setLikedVideos] = useState<number[]>([]);
//   const [likedEvents, setLikedEvents] = useState<number[]>([]);
//   const [activeTab, setActiveTab] = useState<TabType>("blogs");

//   const toggleBlogLike = (id: number) => {
//     setLikedBlogs((prev) =>
//       prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id],
//     );
//   };

//   const toggleVideoLike = (id: number) => {
//     setLikedVideos((prev) =>
//       prev.includes(id) ? prev.filter((vid) => vid !== id) : [...prev, id],
//     );
//   };

//   const toggleEventLike = (id: number) => {
//     setLikedEvents((prev) =>
//       prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id],
//     );
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <main className="relative min-h-screen bg-background">
//       <ParticleBackground />

//       <div className="relative z-10">
//         <Navbar />

//         {/* Hero Section */}
//         <section className="pt-20 pb-2 px-4">
//           <div className="container max-w-7xl">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="text-center mb-12"
//             >
//               <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
//                 Community Hub
//               </h1>
//               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//                 Connect, learn, and grow with our vibrant community. Stay
//                 updated with blogs, videos, and exclusive events.
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Content Section */}
//         <section className="py-12 px-4">
//           <div className="container max-w-7xl">
//             {/* Tabs */}
//             <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

//             {/* Content Display */}
//             <AnimatePresence mode="wait">
//               {activeTab === "blogs" && (
//                 <motion.div
//                   key="blogs"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-4"
//                 >
//                   <div className="mb-6">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-2">
//                       📚 Blog Posts
//                     </h2>
//                     <div className="h-1 w-12 bg-linear-to-r from-primary to-accent rounded-full"></div>
//                   </div>

//                   <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                   >
//                     {blogPosts.map((post) => (
//                       <motion.div key={post.id} variants={itemVariants}>
//                         <BlogCard
//                           {...post}
//                           isLiked={likedBlogs.includes(post.id)}
//                           onLike={toggleBlogLike}
//                         />
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "videos" && (
//                 <motion.div
//                   key="videos"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-4"
//                 >
//                   <div className="mb-6">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-2">
//                       🎬 Videos
//                     </h2>
//                     <div className="h-1 w-12 bg-gradient-to-r from-accent to-primary rounded-full"></div>
//                   </div>

//                   <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                   >
//                     {videos.map((video) => (
//                       <motion.div key={video.id} variants={itemVariants}>
//                         <VideoCard
//                           {...video}
//                           isLiked={likedVideos.includes(video.id)}
//                           onLike={toggleVideoLike}
//                         />
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               )}

//               {activeTab === "events" && (
//                 <motion.div
//                   key="events"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 20 }}
//                   transition={{ duration: 0.3 }}
//                   className="space-y-4"
//                 >
//                   <div className="mb-6">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-2">
//                       🎆 Events
//                     </h2>
//                     <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full"></div>
//                   </div>

//                   <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                   >
//                     {events.map((event) => (
//                       <motion.div key={event.id} variants={itemVariants}>
//                         <EventCard
//                           {...event}
//                           isLiked={likedEvents.includes(event.id)}
//                           onLike={toggleEventLike}
//                         />
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </section>

//         <Footer />
//       </div>
//     </main>
//   );
// }
