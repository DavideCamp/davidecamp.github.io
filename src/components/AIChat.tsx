
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, User } from 'lucide-react';
import { getSimpleResponse } from '@/api/gemini';
import { useTheme } from 'next-themes';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSubmit = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');

    // Add user message
    addMessage(userMessage, true);
    setIsLoading(true);

    try {
      const response = await getSimpleResponse(userMessage);
      // Add AI response
      addMessage(response.text, false);
    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage('Sorry, I encountered an error. Please try again.', false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section id="ai-chat" className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-4 text-foreground">
            AI Assistant
          </h2>
          <p className="text-muted-foreground">
            <strong className='text-foreground text-red-500'>IMPORTANT</strong> <br />
            That's an AI assistant, based on gemini 2.0 model, with a RAG of my Info.
            <br /> <strong className='text-foreground'>NOT Davide.</strong>
            I Don't have responsibility for what he say. <br />
            I'm just testing AI stuff.
            Take it easy!
          </p>
        </div>

        <Card className={`shadow-lg bg-card/50 backdrop-blur-sm h-[600px] flex flex-col ${theme === 'dark' ? 'border-gray-700' : 'border-0 '}`}>
          <CardContent className="p-6 flex flex-col h-full">
            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto mb-6 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with the AI assistant</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${message.isUser
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted text-muted-foreground mr-4'
                        }`}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isUser && (
                          <Bot className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        {message.isUser && (
                          <User className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg p-4 mr-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 min-h-[60px] max-h-[120px] border-0 bg-background/50 text-base resize-none focus:ring-1 focus:ring-primary/20"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!inputText.trim() || isLoading}
                  className="bg-primary/90 hover:bg-primary text-primary-foreground px-6 self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Press Ctrl+Enter (⌘+Enter on Mac) to send quickly
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIChat;
