import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Link as LinkIcon,
  Mail,
  UserPlus,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  Users,
  Building
} from "lucide-react";
import Header from "@/components/Header";

interface AuthorData {
  id: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  website: string;
  joinDate: string;
  connections: number;
  followers: number;
  mutualConnections: number;
  isConnected: boolean;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
    logo?: string;
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
}

const mockAuthors: Record<string, AuthorData> = {
  "sarah-chen": {
    id: "sarah-chen",
    name: "Sarah Chen",
    title: "Product Manager at TechCorp",
    location: "San Francisco, CA",
    bio: "Product leader with 10+ years of experience building user-centric products that scale. Passionate about AI, UX research, and data-driven product decisions. Currently leading the AI initiatives at TechCorp.",
    website: "https://sarahchen.com",
    joinDate: "March 2019",
    connections: 2500,
    followers: 5200,
    mutualConnections: 12,
    isConnected: false,
    skills: ["Product Management", "UX Research", "Data Analytics", "AI/ML", "Agile", "Leadership", "Strategy", "User Experience"],
    experience: [
      {
        company: "TechCorp",
        position: "Senior Product Manager",
        duration: "2021 - Present",
        description: "Leading AI-powered product initiatives, growing user engagement by 150% and revenue by $2M annually. Managing cross-functional teams of 15+ engineers, designers, and data scientists."
      },
      {
        company: "StartupX",
        position: "Product Manager",
        duration: "2019 - 2021",
        description: "Built product from 0 to 100k users. Conducted user research, defined product roadmap, and collaborated with engineering to deliver features that increased retention by 40%."
      }
    ],
    education: [
      {
        school: "MIT Sloan School of Management",
        degree: "MBA",
        year: "2019"
      },
      {
        school: "UC Berkeley",
        degree: "BS Computer Science",
        year: "2016"
      }
    ]
  }
};

const mockPosts = [
  {
    id: "1",
    content: "Just launched our new AI-powered analytics dashboard! 🚀 The team worked incredibly hard to make data insights more accessible for everyone. Key features include real-time visualization, natural language queries, and predictive modeling. Excited to see how this transforms our users' decision-making process. #ProductLaunch #AI #Analytics",
    image: "/placeholder.svg",
    timestamp: "2 hours ago",
    likes: 147,
    comments: 23,
    shares: 15,
    liked: false
  },
  {
    id: "2",
    content: "Reflecting on 5 years in product management... The most important lesson I've learned: always start with the user problem, not the solution. Too often we fall in love with our ideas instead of validating whether they actually solve real pain points. What's your biggest product lesson? #ProductManagement #UserResearch",
    timestamp: "1 day ago",
    likes: 89,
    comments: 34,
    shares: 12,
    liked: false
  },
  {
    id: "3",
    content: "Amazing panel discussion at ProductCon today about the future of AI in product development. Key takeaways: 1) AI will augment, not replace product managers 2) Data literacy is becoming essential 3) Ethics in AI product design is crucial. Grateful to share the stage with such brilliant minds! #ProductCon #AI #Future",
    timestamp: "3 days ago",
    likes: 203,
    comments: 45,
    shares: 28,
    liked: true
  },
  {
    id: "4",
    content: "Behind the scenes of our latest user research study 📊 Spent the week conducting interviews with 50+ users to understand their workflow pain points. The insights are eye-opening and will definitely influence our Q2 roadmap. User research is the foundation of great product decisions! #UXResearch #ProductStrategy",
    timestamp: "1 week ago",
    likes: 156,
    comments: 19,
    shares: 8,
    liked: false
  }
];

export default function AuthorProfile() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState(mockPosts);
  const [author] = useState<AuthorData>(mockAuthors[id || "sarah-chen"] || mockAuthors["sarah-chen"]);
  const [isConnected, setIsConnected] = useState(author.isConnected);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-4 text-center md:text-left">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {author.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      Joined {author.joinDate}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">{author.name}</h1>
                      <p className="text-xl text-muted-foreground mt-1">{author.title}</p>
                      <p className="mt-3 leading-relaxed">{author.bio}</p>
                      
                      <div className="flex gap-6 mt-4">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{author.connections}</div>
                          <div className="text-sm text-muted-foreground">Connections</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{author.followers}</div>
                          <div className="text-sm text-muted-foreground">Followers</div>
                        </div>
                      </div>

                      {author.mutualConnections > 0 && (
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {author.mutualConnections} mutual connections
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={handleConnect}
                        className="gap-2"
                        variant={isConnected ? "outline" : "default"}
                      >
                        <UserPlus className="w-4 h-4" />
                        {isConnected ? "Connected" : "Connect"}
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-6">
              <div className="text-center py-4">
                <h3 className="font-semibold text-lg">{author.name}'s Posts</h3>
                <p className="text-muted-foreground">Recent updates and insights</p>
              </div>

              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>
                              {author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{author.name}</h4>
                            <p className="text-sm text-muted-foreground">{author.title}</p>
                            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <p className="leading-relaxed">{post.content}</p>
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

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}
                          >
                            <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
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
            </TabsContent>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    <a href={author.website} className="text-primary hover:underline">
                      {author.website}
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect to see contact information
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {author.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              {author.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-3">{exp.duration}</p>
                        <p className="leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              {author.education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.year}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
