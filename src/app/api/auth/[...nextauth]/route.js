import NextAuth from "next-auth";
import authOptions from "@/lib/authOptions";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const nextauth = searchParams.get('nextauth');
    
    if (!nextauth) {
      return new Response('Bad Request: Missing nextauth', { status: 400 });
    }
  
    return NextAuth(req, nextauth);
  }

export async function POST(request, { params }) {
  console.log("POST request:", request);
  console.log("Params:", params);
  return NextAuth(authOptions)(request, params);
}
