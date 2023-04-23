import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: import.meta.env.VITE_PROJECT_ID,
  dataset: "production",
  useCdn: true,
});
