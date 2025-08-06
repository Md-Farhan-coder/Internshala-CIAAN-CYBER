import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  User,
  Shield,
  Bell,
  Eye,
  Smartphone,
  Download,
  Trash2,
  AlertTriangle,
  Camera,
  Moon,
  Sun,
  Monitor,
  Mail,
  MessageSquare,
  Users,
  Heart,
  Share2,
  Settings as SettingsIcon,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

import { getUserId } from '@/utils/localStorageUser.js';
interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  likes: boolean;
  comments: boolean;
  mentions: boolean;
  connections: boolean;
  messages: boolean;
  jobAlerts: boolean;
  weeklyDigest: boolean;
  networkUpdates: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'connections' | 'private';
  showEmail: boolean;
  showPhone: boolean;
  activityStatus: boolean;
  readReceipts: boolean;
  allowMessagesFrom: 'anyone' | 'connections' | 'none';
  showConnectionsList: boolean;
  searchableByEmail: boolean;
}

export default function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('America/New_York');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    likes: true,
    comments: true,
    mentions: true,
    connections: true,
    messages: true,
    jobAlerts: false,
    weeklyDigest: true,
    networkUpdates: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    activityStatus: true,
    readReceipts: true,
    allowMessagesFrom: 'connections',
    showConnectionsList: true,
    searchableByEmail: true
  });

  const updateNotification = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const updatePrivacy = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleDataDownload = () => {
    // Simulate data download
    setShowDownloadDialog(false);
    // In a real app, this would trigger a download
    alert('Your data download has been initiated. You will receive an email when it\'s ready.');
  };

  const handleAccountDelete = () => {
    // Simulate account deletion
    setShowDeleteDialog(false);
    alert('Account deletion process initiated. You will receive a confirmation email.');
  };
const user = getUserId();
  const homesend =`/home/${user}`;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to={homesend}>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
            </div>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="account" className="gap-2">
                <User className="w-4 h-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Eye className="w-4 h-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="data" className="gap-2">
                <Download className="w-4 h-4" />
                Data
              </TabsTrigger>
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and professional information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Profile Photo</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload a professional photo that represents you well
                      </p>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://johndoe.dev" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input 
                      id="bio" 
                      defaultValue="Senior Software Engineer passionate about building scalable applications"
                    />
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Connected Apps
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Login Activity
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Visibility</CardTitle>
                  <CardDescription>Control who can see your profile and information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select 
                      value={privacy.profileVisibility} 
                      onValueChange={(value: 'public' | 'connections' | 'private') => 
                        updatePrivacy('profileVisibility', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                        <SelectItem value="connections">Connections only</SelectItem>
                        <SelectItem value="private">Private - Only you</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show email address</Label>
                        <p className="text-sm text-muted-foreground">Let others see your email</p>
                      </div>
                      <Switch
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => updatePrivacy('showEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show phone number</Label>
                        <p className="text-sm text-muted-foreground">Let others see your phone</p>
                      </div>
                      <Switch
                        checked={privacy.showPhone}
                        onCheckedChange={(checked) => updatePrivacy('showPhone', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show connections list</Label>
                        <p className="text-sm text-muted-foreground">Let others see who you're connected to</p>
                      </div>
                      <Switch
                        checked={privacy.showConnectionsList}
                        onCheckedChange={(checked) => updatePrivacy('showConnectionsList', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Searchable by email</Label>
                        <p className="text-sm text-muted-foreground">Let people find you by your email address</p>
                      </div>
                      <Switch
                        checked={privacy.searchableByEmail}
                        onCheckedChange={(checked) => updatePrivacy('searchableByEmail', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Communication Settings</CardTitle>
                  <CardDescription>Control how others can contact you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Who can send you messages</Label>
                    <Select 
                      value={privacy.allowMessagesFrom} 
                      onValueChange={(value: 'anyone' | 'connections' | 'none') => 
                        updatePrivacy('allowMessagesFrom', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="anyone">Anyone</SelectItem>
                        <SelectItem value="connections">Connections only</SelectItem>
                        <SelectItem value="none">No one</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show activity status</Label>
                        <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                      </div>
                      <Switch
                        checked={privacy.activityStatus}
                        onCheckedChange={(checked) => updatePrivacy('activityStatus', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Read receipts</Label>
                        <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
                      </div>
                      <Switch
                        checked={privacy.readReceipts}
                        onCheckedChange={(checked) => updatePrivacy('readReceipts', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => updateNotification('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          Push notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => updateNotification('pushNotifications', checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Activity Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Likes and reactions
                        </Label>
                        <p className="text-sm text-muted-foreground">When someone likes your posts</p>
                      </div>
                      <Switch
                        checked={notifications.likes}
                        onCheckedChange={(checked) => updateNotification('likes', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Comments
                        </Label>
                        <p className="text-sm text-muted-foreground">When someone comments on your posts</p>
                      </div>
                      <Switch
                        checked={notifications.comments}
                        onCheckedChange={(checked) => updateNotification('comments', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Mentions</Label>
                        <p className="text-sm text-muted-foreground">When someone mentions you in a post</p>
                      </div>
                      <Switch
                        checked={notifications.mentions}
                        onCheckedChange={(checked) => updateNotification('mentions', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          New connections
                        </Label>
                        <p className="text-sm text-muted-foreground">When someone connects with you</p>
                      </div>
                      <Switch
                        checked={notifications.connections}
                        onCheckedChange={(checked) => updateNotification('connections', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Messages</Label>
                        <p className="text-sm text-muted-foreground">When you receive a new message</p>
                      </div>
                      <Switch
                        checked={notifications.messages}
                        onCheckedChange={(checked) => updateNotification('messages', checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Updates & Digest</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly digest</Label>
                        <p className="text-sm text-muted-foreground">Weekly summary of your network activity</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => updateNotification('weeklyDigest', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Network updates</Label>
                        <p className="text-sm text-muted-foreground">Updates from your professional network</p>
                      </div>
                      <Switch
                        checked={notifications.networkUpdates}
                        onCheckedChange={(checked) => updateNotification('networkUpdates', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Job alerts</Label>
                        <p className="text-sm text-muted-foreground">Notifications about relevant job opportunities</p>
                      </div>
                      <Switch
                        checked={notifications.jobAlerts}
                        onCheckedChange={(checked) => updateNotification('jobAlerts', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Choose your preferred theme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      onClick={() => setTheme('light')}
                      className="h-20 flex-col"
                    >
                      <Sun className="w-6 h-6 mb-2" />
                      Light
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      onClick={() => setTheme('dark')}
                      className="h-20 flex-col"
                    >
                      <Moon className="w-6 h-6 mb-2" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      onClick={() => setTheme('system')}
                      className="h-20 flex-col"
                    >
                      <Monitor className="w-6 h-6 mb-2" />
                      System
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language & Region</CardTitle>
                  <CardDescription>Set your language and timezone preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Data & Privacy */}
            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your data and account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <Download className="w-5 h-5 text-blue-500 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium">Download your data</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get a copy of all your data including posts, connections, and profile information
                        </p>
                        <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="mt-3">
                              <Download className="w-4 h-4 mr-2" />
                              Download Data
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Download Your Data</DialogTitle>
                              <DialogDescription>
                                This will create a download link with all your data. You'll receive an email when it's ready.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowDownloadDialog(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleDataDownload}>
                                Request Download
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                      <ExternalLink className="w-5 h-5 text-green-500 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium">Data portability</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Export your data to use with other services
                        </p>
                        <Button variant="outline" size="sm" className="mt-3">
                          Export Data
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-destructive flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Danger Zone
                    </h4>
                    
                    <div className="flex items-start gap-4 p-4 border border-destructive/50 rounded-lg">
                      <Trash2 className="w-5 h-5 text-destructive mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium">Delete your account</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="mt-3">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Account
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Account</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete your account? This action is permanent and cannot be undone.
                                All your posts, connections, and data will be permanently removed.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleAccountDelete}>
                                Delete Account
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
