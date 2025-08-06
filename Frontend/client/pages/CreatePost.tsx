import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { getUserId } from "@/utils/localStorageUser";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Calendar,
  BarChart3,
  X,
  Upload,
  Bold,
  Italic,
  List,
  Quote,
  Link2,
  Hash,
  Globe,
  Users,
  Lock,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {getUrl} from '@/utils/getUrl';

interface MediaFile {
  id: string;
  type: 'image' | 'video' | 'document';
  file: File;
  preview: string;
}

const user = getUserId();
  const homesend =`/home/${user}`;

const postTypes = [
  { id: 'text', label: 'Text Post', icon: FileText },
  { id: 'image', label: 'Photo Post', icon: ImageIcon },
  { id: 'video', label: 'Video Post', icon: Video },
  { id: 'article', label: 'Article', icon: FileText },
  { id: 'poll', label: 'Poll', icon: BarChart3 },
  { id: 'event', label: 'Event', icon: Calendar }
];

const audienceOptions = [
  { value: 'public', label: 'Anyone', icon: Globe, description: 'Visible to anyone on or off CIAAN CYBER TECH ' },
  { value: 'connections', label: 'Connections only', icon: Users, description: 'Visible to your connections' },
  { value: 'private', label: 'Only me', icon: Lock, description: 'Only visible to you' }
];

export default function CreatePost() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [postType, setPostType] = useState('text');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [likes, setlikes] = useState( Math.floor(Math.random() * 100) + 1);
  const [audience, setAudience] = useState('public');
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [reshareEnabled, setReshareEnabled] = useState(true);

  const userId = getUserId();
     const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get(getUrl+`/user/${userId}`);
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            setErrorMsg(res.data.message);
          }
        } catch (err) {
          setErrorMsg("Error fetching user");
        }
      };
  
      fetchUser();
    }, []);

  // Poll specific state
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [pollDuration, setPollDuration] = useState('7');

  // Event specific state
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      const mediaFile: MediaFile = {
        id: Date.now().toString() + Math.random(),
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
        file,
        preview: URL.createObjectURL(file)
      };
      
      setMediaFiles(prev => [...prev, mediaFile]);
    });
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

const handlePublish = async () => {
  setIsPublishing(true);

  const  payload = {
    userId,
    title,
    likes,
    content,
    audience,
    postType,
    commentsEnabled,
    reshareEnabled,
    tags,
    media: mediaFiles.map((file) => ({
      name: file.file.name,
      type: file.file.type,
      data:  file.file.text(), // or convert to base64 if needed
    })),
  }

  try {
    const response = await axios.post(getUrl()+"/create", payload);

    if (response.status === 200) {
      navigate(`/home/${userId}`);
    } else {
      alert("Failed to publish post");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  } finally {
    setIsPublishing(false);
  }
};


  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'quote':
        formattedText = `> ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header/>
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to={homesend}>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Create a post</h1>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger className="w-48 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Post Type Selection */}
                <div className="space-y-2">
                <Label className="text-2xl">Title</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  
                  />
                  
                </div> </div>

              <Tabs value={postType} onValueChange={setPostType}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger value="image" className="gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Photo
                  </TabsTrigger>
                  <TabsTrigger value="poll" className="gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Poll
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text" className="space-y-4">
                  {/* Text Editor */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => formatText('bold')}
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => formatText('italic')}
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => formatText('quote')}
                      >
                        <Quote className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <List className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Link2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Textarea
                      placeholder="What do you want to talk about?"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[200px] resize-none text-lg"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <Textarea
                    placeholder="What do you want to talk about?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                  
                  {/* Media Upload */}
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-24 border-dashed"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-6 h-6" />
                        <span>Click to upload images or videos</span>
                      </div>
                    </Button>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    {/* Media Preview */}
                    {mediaFiles.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {mediaFiles.map((file) => (
                          <div key={file.id} className="relative">
                            {file.type === 'image' ? (
                              <img
                                src={file.preview}
                                alt="Upload preview"
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            ) : (
                              <video
                                src={file.preview}
                                className="w-full h-32 object-cover rounded-lg"
                                controls
                              />
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={() => removeMediaFile(file.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="poll" className="space-y-4">
                  <Textarea
                    placeholder="Ask a question..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  
                  <div className="space-y-3">
                    <Label>Poll Options</Label>
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                        />
                        {pollOptions.length > 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removePollOption(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    {pollOptions.length < 4 && (
                      <Button variant="outline" onClick={addPollOption}>
                        Add Option
                      </Button>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Label>Poll Duration</Label>
                      <Select value={pollDuration} onValueChange={setPollDuration}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="3">3 days</SelectItem>
                          <SelectItem value="7">1 week</SelectItem>
                          <SelectItem value="14">2 weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag}>
                    <Hash className="w-4 h-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        #{tag}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Post Settings */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow comments</Label>
                    <p className="text-sm text-muted-foreground">Let people comment on your post</p>
                  </div>
                  <Switch
                    checked={commentsEnabled}
                    onCheckedChange={setCommentsEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow resharing</Label>
                    <p className="text-sm text-muted-foreground">Let people share your post</p>
                  </div>
                  <Switch
                    checked={reshareEnabled}
                    onCheckedChange={setReshareEnabled}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(homesend)}
                >
                  Save Draft
                </Button>
                <Button
                  className="flex-1"
                  onClick={handlePublish}
                  disabled={isPublishing || !content.trim()}
                >
                  {isPublishing ? "Publishing..." : "Publish"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
