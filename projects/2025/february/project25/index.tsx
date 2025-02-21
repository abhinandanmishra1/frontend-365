import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  imageUrl: string;
}

interface Message {
  id: number;
  sender: number;
  receiver: number;
  message: string;
}

interface ChatProps {
  user: User;
  messages: Message[];
  whoAreTyping: Set<number>;
  onTyping: (action: "add" | "remove", userId: number) => void;
  onSendMessage: (message: Message) => void;
}

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface ChatMessagesProps {
  messages: Message[];
  user: User;
  showTypingIndicator: boolean;
}

const ChatMessages = ({
  messages,
  user,
  showTypingIndicator,
}: ChatMessagesProps) => {
  return (
    <div className="h-96 overflow-y-auto mb-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end": message.sender === user.id,
            "justify-start": message.sender !== user.id,
          })}
        >
          <div
            className={cn("max-w-[80%] p-3 rounded-lg", {
              "bg-blue-500 text-white rounded-br-none":
                message.sender === user.id,
              "bg-gray-100 text-gray-900 rounded-bl-none":
                message.sender !== user.id,
            })}
          >
            {message.message}
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {/* This logic of showing indicator can be different for real use case */}
      {showTypingIndicator && <TypingIndicator />}
    </div>
  );
};

const Chat = ({
  user,
  messages,
  whoAreTyping,
  onTyping,
  onSendMessage,
}: ChatProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage({
        id: messages.length + 1,
        sender: user.id,
        receiver: user.id === 1 ? 2 : 1,
        message: inputMessage.trim(),
      });
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      onTyping("remove", user.id);
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = inputMessage.slice(0, cursorPosition);
      const textAfterCursor = inputMessage.slice(cursorPosition);

      setInputMessage(textBeforeCursor + "\n" + textAfterCursor);

      // Adjust textarea height
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      // Set cursor position after the new line
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
      }, 0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInputMessage(textarea.value);

    // Adjust textarea height
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (textarea.value === "") {
      onTyping("remove", user.id);
    } else if (!whoAreTyping.has(user.id)) {
      onTyping("add", user.id);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto my-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt={user?.name} />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{user?.name}</h2>
          </div>
        </div>

        <ChatMessages
          messages={messages}
          user={user}
          showTypingIndicator={
            whoAreTyping.size > 1 ||
            (whoAreTyping.size > 0 && !whoAreTyping.has(user.id))
          }
        />

        <div className="flex space-x-2">
          <Textarea
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 min-h-[40px] max-h-32 resize-none"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ChatApp = () => {
  const user1 = {
    id: 1,
    name: "Abhinandan",
    imageUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
  };

  const user2 = {
    id: 2,
    name: "Raj",
    imageUrl: "https://randomuser.me/api/portraits/lego/2.jpg",
  };

  const [whoAreTyping, setWhoAreTyping] = useState<Set<number>>(new Set());
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 1, receiver: 2, message: "Hello" },
    { id: 2, sender: 2, receiver: 1, message: "Hi" },
  ]);

  const handleTyping = (action: "add" | "remove", userId: number) => {
    if (action === "add") {
      setWhoAreTyping((prev) => new Set(prev).add(userId));
    } else {
      setWhoAreTyping((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const onSendMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex gap-8">
      <Chat
        user={user1}
        messages={messages}
        whoAreTyping={whoAreTyping}
        onTyping={handleTyping}
        onSendMessage={onSendMessage}
      />
      <Chat
        user={user2}
        messages={messages}
        whoAreTyping={whoAreTyping}
        onTyping={handleTyping}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default function Project25() {
  return (
    <div className="max-w-7xl mx-auto p-4 pt-6">
      <ChatApp />
    </div>
  );
}
