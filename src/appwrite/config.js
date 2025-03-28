import { Client, Databases } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) 
  // .setKey(import.meta.env.VITE_APPWRITE_API_KEY); // API Key

const databases = new Databases(client);
export { client, databases };
