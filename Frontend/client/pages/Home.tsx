import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {getUrl} from '@/utils/getUrl';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal,
  Image as ImageIcon,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Briefcase
} from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { log } from "console";
import { saveUserData, getUserData, clearUserData } from '@/utils/userData.js';
interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      title: "Product Manager at TechCorp",
      avatar: "/placeholder.svg",
      verified: true
    },
    content: "Just launched our new AI-powered analytics dashboard! 🚀 The team worked incredibly hard to make data insights more accessible for everyone. Key features include real-time visualization, natural language queries, and predictive modeling. Excited to see how this transforms our users' decision-making process. #ProductLaunch #AI #Analytics",
    image: "/placeholder.svg",
    timestamp: "2h",
    likes: 47,
    comments: 12,
    shares: 8
  },
  {
    id: "2",
    author: {
      name: "Michael Rodriguez",
      title: "Senior Software Engineer at StartupX",
      avatar: "/placeholder.svg"
    },
    content: "Great networking event at TechHub today! Met amazing professionals from various industries. Key takeaway: The future of work is definitely hybrid, and companies that embrace this flexibility are attracting top talent. What are your thoughts on remote vs office work? #Networking #FutureOfWork",
    timestamp: "4h",
    likes: 23,
    comments: 15,
    shares: 3
  },
  {
    id: "3",
    author: {
      name: "Dr. Emily Watson",
      title: "Data Scientist | AI Researcher",
      avatar: "/placeholder.svg",
      verified: true
    },
    content: "Published my latest research on machine learning applications in healthcare. The potential to improve patient outcomes through predictive analytics is enormous. Link to the paper in comments. Always happy to discuss the technical details with fellow researchers! #MachineLearning #Healthcare #Research",
    timestamp: "1d",
    likes: 89,
    comments: 24,
    shares: 16
  }
];

const trendingTopics = [
  "AI & Machine Learning",
  "Remote Work",
  "Product Management",
  "Data Science",
  "Startup Culture"
];

const suggestedConnections = [
  { name: "Alex Thompson", title: "UX Designer", mutualConnections: 5 },
  { name: "Lisa Park", title: "Marketing Director", mutualConnections: 3 },
  { name: "David Kim", title: "Software Architect", mutualConnections: 8 }
];

console.log(getUrl());

export default function Home() {
  const [postContent, setPostContent] = useState("");

  
   const { id } = useParams(); // get user id from URL
   const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

   const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(getUrl()+"/feed")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(getUrl()+`/user/${id}`);
        if (res.data.success) {
         
          setUser(res.data.user);
           saveUserData({
                  firstName: res.data.user.firstname,
                  lastName: res.data.user.lastname,
                  email: res.data.user.email,
                  jobTitle: res.data.user.jobtilte
                });

                console.log(getUserData);
                 console.log(process.env.URL);

        } else {
          setErrorMsg(res.data.message);
        }
      } catch (err) {
        setErrorMsg("Error fetching user");
      }
    };

    fetchUser();
  }, [id]);

  if (errorMsg) return <div>{errorMsg}</div>;
  if (!user) return <div>Loading...</div>;




  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleShare = () => {
    if (postContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: {
          name: user.firstname+" " +user.lastname,
          title: user.jobtilte,
          avatar: "/placeholder.svg"
        },
        content: postContent,
        timestamp: "now",
        likes: 0,
        comments: 0,
        shares: 0
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };
console.log(id);



// Save user data

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-16 h-16 mx-auto">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.firstname} {user.lastname}</h3>
                    <p className="text-sm text-muted-foreground">{user.jobtilte}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profile views</span>
                      <span className="font-medium">127</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connections</span>
                      <span className="font-medium">543</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to="/profile">View Profile</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Trending Topics
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Photo
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Article
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Event
                        </Button>
                      </div>
                      <Button onClick={handleShare} disabled={!postContent.trim()}>
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.author.name}</h4>
                            {post.author.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{post.author.title}</p>
                          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed">{post.content}</p>
                      {post.image && (
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-64 object-cover bg-muted"
                          />
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex gap-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}
                        >
                          <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                          { post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Share2 className="w-4 h-4" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  People You May Know
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {suggestedConnections.map((connection, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {connection.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{connection.name}</p>
                          <p className="text-xs text-muted-foreground">{connection.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {connection.mutualConnections} mutual connections
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Job Recommendations
                </h3>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Senior React Developer</p>
                    <p className="text-muted-foreground">TechCorp • Remote</p>
                  </div>
                  <div>
                    <p className="font-medium">Product Manager</p>
                    <p className="text-muted-foreground">StartupX • San Francisco</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    See All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
