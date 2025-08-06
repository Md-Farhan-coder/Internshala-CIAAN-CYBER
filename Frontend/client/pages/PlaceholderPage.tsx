import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import { Link, useLocation } from "react-router-dom";
import { getUserId } from '@/utils/localStorageUser.js';
interface PlaceholderPageProps {
  title: string;
  description: string;
  suggestedAction?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  suggestedAction = "This page is coming soon!" 
}: PlaceholderPageProps) {
  const location = useLocation();
const user = getUserId();
  const homesend =`/home/${user}`;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Construction className="w-8 h-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">{description}</p>
              <p className="text-sm text-muted-foreground">{suggestedAction}</p>
              
              <div className="space-y-2 pt-4">
                <Button asChild className="w-full">
                  <Link to={homesend}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Page-specific placeholder components
export function ProfilePage() {
  return (
    <PlaceholderPage
      title="Profile Page"
      description="View and edit your professional profile, showcase your experience, and manage your personal information."
      suggestedAction="Ask me to build the complete profile page with edit functionality!"
    />
  );
}

export function CreatePostPage() {
  return (
    <PlaceholderPage
      title="Create Post"
      description="Share your thoughts, insights, and professional updates with your network."
      suggestedAction="Ask me to build the post creation page with rich text editing!"
    />
  );
}

export function EditPostPage() {
  return (
    <PlaceholderPage
      title="Edit Post"
      description="Modify your existing posts and keep your content up to date."
      suggestedAction="Ask me to build the post editing interface!"
    />
  );
}

export function AuthorPage() {
  return (
    <PlaceholderPage
      title="Author Profile"
      description="View other users' profiles, their posts, and professional information."
      suggestedAction="Ask me to build the author profile page with their post history!"
    />
  );
}

export function NetworkPage() {
  return (
    <PlaceholderPage
      title="My Network"
      description="Manage your professional connections and discover new networking opportunities."
      suggestedAction="Ask me to build the networking page with connection management!"
    />
  );
}

export function MessagingPage() {
  return (
    <PlaceholderPage
      title="Messages"
      description="Communicate with your professional network through private messages."
      suggestedAction="Ask me to build the messaging interface!"
    />
  );
}

export function NotificationsPage() {
  return (
    <PlaceholderPage
      title="Notifications"
      description="Stay updated with likes, comments, connection requests, and other professional activities."
      suggestedAction="Ask me to build the notifications center!"
    />
  );
}
