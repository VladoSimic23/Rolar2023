import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "sss2glsh",
  dataset: "production",
  useCdn: true,
});
