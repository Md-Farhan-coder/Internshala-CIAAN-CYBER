import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {getUrl} from '@/utils/getUrl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Edit3, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Link as LinkIcon,
  Mail,
  Phone,
  Plus,
  X,
  Heart,
  MessageCircle,
  Share2,
  Camera
} from "lucide-react";
import Header from "@/components/Header";
import { saveUserData, getUserData, clearUserData } from '@/utils/userData.js';
import {getUserId } from '@/utils/localStorageUser.js';
interface UserProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  joinDate: string;
  connections: number;
  followers: number;
  skills: string[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
  }[];
  education: {
    school: string;
    degree: string;
    year: string;
  }[];
}
const userId = getUserId();
const user=getUserData();
const mockProfile: UserProfile = {
  name: user.firstName + user.lastName,
  title: user.jobTitle,
  location: "San Francisco, CA",
  email: user.email,
  phone: "+1 (555) 123-4567",
  bio: "Passionate software engineer with 8+ years of experience building scalable web applications. I love working with modern technologies and mentoring junior developers.",
  website: "https://johndoe.dev",
  joinDate: "January 2020",
  connections: 543,
  followers: 1200,
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "GraphQL", "Docker", "Kubernetes"],
  experience: [
    {
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      duration: "2022 - Present",
      description: "Lead frontend development for enterprise applications serving 100k+ users. Implemented modern React architecture and improved performance by 40%."
    },
    {
      company: "StartupX",
      position: "Full Stack Developer",
      duration: "2020 - 2022",
      description: "Built product features from MVP to scale, working across frontend and backend. Collaborated with design and product teams to deliver user-focused solutions."
    }
  ],
  education: [
    {
      school: "Stanford University",
      degree: "Master of Science in Computer Science",
      year: "2020"
    },
    {
      school: "UC Berkeley",
      degree: "Bachelor of Science in Computer Science",
      year: "2018"
    }
  ]
};

const mockPosts = [
  {
    id: "1",
    content: "Just shipped a new feature that reduces load times by 50%! The key was implementing smart caching strategies and optimizing our bundle size. Always exciting to see performance improvements translate to better user experience. #Performance #WebDev",
    timestamp: "2 days ago",
    likes: 34,
    comments: 8,
    shares: 12,
    image: "/placeholder.svg"
  },
  {
    id: "2",
    content: "Attended an amazing tech meetup tonight about the future of AI in software development. The potential for AI-assisted coding is incredible, but human creativity and problem-solving will always be at the core of great software. #AI #TechMeetup",
    timestamp: "1 week ago",
    likes: 67,
    comments: 15,
    shares: 23
  }
];

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(mockProfile);
  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm({
        ...editForm,
        skills: [...editForm.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter(skill => skill !== skillToRemove)
    });
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
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-2xl">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4 text-center md:text-left">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4" />
                      Joined {profile.joinDate}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold">{profile.name}</h1>
                      <p className="text-xl text-muted-foreground mt-1">{profile.title}</p>
                      <p className="mt-3 leading-relaxed">{profile.bio}</p>
                      
                      <div className="flex gap-6 mt-4">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{profile.connections}</div>
                          <div className="text-sm text-muted-foreground">Connections</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">{profile.followers}</div>
                          <div className="text-sm text-muted-foreground">Followers</div>
                        </div>
                      </div>
                    </div>

                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Edit3 className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>
                            Update your professional information
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="title">Job Title</Label>
                              <Input
                                id="title"
                                value={editForm.title}
                                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editForm.bio}
                              onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                value={editForm.location}
                                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                value={editForm.website}
                                onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={editForm.email}
                                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input
                                id="phone"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Skills</Label>
                            <div className="flex gap-2 mb-2">
                              <Input
                                placeholder="Add a skill"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                              />
                              <Button type="button" onClick={addSkill}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {editForm.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="gap-1">
                                  {skill}
                                  <X 
                                    className="w-3 h-3 cursor-pointer" 
                                    onClick={() => removeSkill(skill)}
                                  />
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                          <Button onClick={handleSave}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

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
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    <a href={profile.website} className="text-primary hover:underline">
                      {profile.website}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{profile.name}</h4>
                          <p className="text-sm text-muted-foreground">{profile.title}</p>
                          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                        </div>
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
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Heart className="w-4 h-4" />
                            {post.likes}
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
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              {profile.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
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
              {profile.education.map((edu, index) => (
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
