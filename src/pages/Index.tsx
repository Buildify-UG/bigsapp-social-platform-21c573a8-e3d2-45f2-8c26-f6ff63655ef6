import { useState } from 'react';
import { Home, MessageCircle, Gamepad2, Users, User, Heart, MessageCircle as Comment, Share2, Search, Phone, Video, MoreVertical, Crown, Trophy, Zap } from 'lucide-react';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');

  // Sample data
  const currentUser = {
    id: 1,
    name: 'You',
    username: '@yourname',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    level: 12,
    wins: 47,
    matches: 156,
    bio: 'Ludo enthusiast & social butterfly 🎲',
  };

  const friends = [
    {
      id: 2,
      name: 'Alex Chen',
      username: '@alexchen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      level: 15,
      online: true,
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      username: '@sarahjohn',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      level: 10,
      online: true,
    },
    {
      id: 4,
      name: 'Marcus Dev',
      username: '@marcusdev',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      level: 18,
      online: false,
    },
  ];

  const posts = [
    {
      id: 1,
      author: friends[0],
      content: 'Just won 3 games in a row! 🎉 Level 15 unlocked!',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
      likes: 234,
      comments: 18,
      timestamp: '2 hours ago',
      liked: false,
    },
    {
      id: 2,
      author: friends[1],
      content: 'Who wants to play Ludo? Creating a private room now 🎲',
      image: null,
      likes: 89,
      comments: 12,
      timestamp: '4 hours ago',
      liked: true,
    },
    {
      id: 3,
      author: friends[2],
      content: 'New strategy guide: How to master the endgame in Ludo',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop',
      likes: 456,
      comments: 67,
      timestamp: '6 hours ago',
      liked: false,
    },
  ];

  const chats = [
    {
      id: 1,
      user: friends[0],
      lastMessage: "Let's play Ludo later?",
      unread: 2,
      timestamp: '5m',
    },
    {
      id: 2,
      user: friends[1],
      lastMessage: 'You: Sounds good! 👍',
      unread: 0,
      timestamp: '1h',
    },
    {
      id: 3,
      user: friends[2],
      lastMessage: 'Check out my new guide',
      unread: 1,
      timestamp: '3h',
    },
  ];

  const ludoRooms = [
    {
      id: 1,
      code: 'BGS-7284',
      host: friends[0],
      players: 2,
      maxPlayers: 4,
      status: 'waiting',
    },
    {
      id: 2,
      code: 'BGS-5821',
      host: friends[1],
      players: 3,
      maxPlayers: 4,
      status: 'playing',
    },
  ];

  const groups = [
    {
      id: 1,
      name: 'Gaming Squad',
      members: 24,
      avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      unread: 5,
    },
    {
      id: 2,
      name: 'Ludo Masters',
      members: 156,
      avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      unread: 0,
    },
  ];

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary-foreground">BigSapp</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-primary/20 rounded-lg transition">
            <Search size={20} className="text-primary-foreground" />
          </button>
          <button className="p-2 hover:bg-primary/20 rounded-lg transition">
            <MoreVertical size={20} className="text-primary-foreground" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* HOME TAB */}
        {activeTab === 'home' && (
          <div className="space-y-4 p-4">
            {/* Create Post Card */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex gap-3">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="flex-1 bg-muted rounded-full px-4 py-2 text-sm placeholder-muted-foreground outline-none"
                />
              </div>
            </div>

            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-semibold text-sm">{post.author.name}</div>
                        <div className="text-xs text-muted-foreground">{post.timestamp}</div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-muted rounded transition">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <p className="text-sm mb-3">{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="post" className="w-full h-48 object-cover rounded-lg mb-3" />
                  )}
                </div>

                {/* Reactions */}
                <div className="px-4 py-2 bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={14} className="fill-red-500 text-red-500" />
                    {post.likes}
                  </div>
                  <div>{post.comments} comments</div>
                </div>

                {/* Actions */}
                <div className="px-4 py-2 flex items-center justify-around border-t border-border">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-muted rounded transition text-sm">
                    <Heart size={16} />
                    Like
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-muted rounded transition text-sm">
                    <Comment size={16} />
                    Comment
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-muted rounded transition text-sm">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHATS TAB */}
        {activeTab === 'chats' && (
          <div className="space-y-2 p-4">
            {chats.map((chat) => (
              <div key={chat.id} className="bg-card rounded-lg p-4 border border-border flex items-center justify-between hover:bg-muted/50 cursor-pointer transition">
                <div className="flex items-center gap-3 flex-1">
                  <div className="relative">
                    <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full" />
                    {chat.user.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{chat.user.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{chat.lastMessage}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-muted-foreground">{chat.timestamp}</div>
                  {chat.unread > 0 && (
                    <div className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LUDO TAB */}
        {activeTab === 'ludo' && (
          <div className="p-4 space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-gradient-to-br from-primary to-accent rounded-lg p-6 text-primary-foreground font-semibold flex flex-col items-center justify-center gap-2 hover:shadow-lg transition">
                <Zap size={24} />
                Quick Join
              </button>
              <button className="bg-gradient-to-br from-accent to-primary rounded-lg p-6 text-primary-foreground font-semibold flex flex-col items-center justify-center gap-2 hover:shadow-lg transition">
                <Users size={24} />
                Create Room
              </button>
            </div>

            {/* Available Rooms */}
            <div>
              <h3 className="font-semibold mb-3">Available Rooms</h3>
              {ludoRooms.map((room) => (
                <div key={room.id} className="bg-card rounded-lg p-4 border border-border mb-3 hover:border-accent transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-sm">Room {room.code}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${room.status === 'playing' ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                      {room.status === 'playing' ? 'Playing' : 'Waiting'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={room.host.avatar} alt={room.host.name} className="w-8 h-8 rounded-full" />
                      <div className="text-sm text-muted-foreground">{room.players}/{room.maxPlayers} players</div>
                    </div>
                    <button className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-lg hover:opacity-90 transition">
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === 'groups' && (
          <div className="p-4 space-y-3">
            {groups.map((group) => (
              <div key={group.id} className="bg-card rounded-lg p-4 border border-border flex items-center justify-between hover:border-accent transition cursor-pointer">
                <div className="flex items-center gap-3 flex-1">
                  <img src={group.avatar} alt={group.name} className="w-12 h-12 rounded-lg" />
                  <div>
                    <div className="font-semibold text-sm">{group.name}</div>
                    <div className="text-xs text-muted-foreground">{group.members} members</div>
                  </div>
                </div>
                {group.unread > 0 && (
                  <div className="bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {group.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="p-4 space-y-4">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-primary-foreground relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary-foreground/10 rounded-full -mr-10 -mt-10" />
              <div className="flex items-end gap-4 relative z-10">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full border-4 border-primary-foreground" />
                <div>
                  <div className="text-xl font-bold">{currentUser.name}</div>
                  <div className="text-sm opacity-90">{currentUser.username}</div>
                  <div className="text-xs opacity-75 mt-1">{currentUser.bio}</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-card rounded-lg p-4 border border-border text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Crown size={16} className="text-accent" />
                  <div className="text-2xl font-bold">{currentUser.level}</div>
                </div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy size={16} className="text-yellow-500" />
                  <div className="text-2xl font-bold">{currentUser.wins}</div>
                </div>
                <div className="text-xs text-muted-foreground">Wins</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border text-center">
                <div className="text-2xl font-bold">{currentUser.matches}</div>
                <div className="text-xs text-muted-foreground">Matches</div>
              </div>
            </div>

            {/* Friends */}
            <div>
              <h3 className="font-semibold mb-3">Friends</h3>
              {friends.map((friend) => (
                <div key={friend.id} className="bg-card rounded-lg p-3 border border-border mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                      {friend.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-card" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{friend.name}</div>
                      <div className="text-xs text-muted-foreground">Level {friend.level}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-muted rounded transition">
                      <MessageCircle size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-muted rounded transition">
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around h-20">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'chats', icon: MessageCircle, label: 'Chats' },
          { id: 'ludo', icon: Gamepad2, label: 'Ludo' },
          { id: 'groups', icon: Users, label: 'Groups' },
          { id: 'profile', icon: User, label: 'Profile' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-16 h-16 transition ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon size={24} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
