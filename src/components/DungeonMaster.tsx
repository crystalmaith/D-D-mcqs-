import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Scroll, Heart, Backpack } from "lucide-react";

interface GameState {
  playerName: string;
  inventory: string[];
  health: number;
  location: string;
  companions: string[];
}

interface StoryEntry {
  type: 'scene' | 'choice' | 'action';
  content: string;
  choices?: string[];
  timestamp: Date;
}

const DungeonMaster = () => {
  const [gameState, setGameState] = useState<GameState>({
    playerName: "Adventurer",
    inventory: ["A worn leather pouch", "A lucky charm"],
    health: 100,
    location: "The Whispering Willow Tavern",
    companions: []
  });

  const [story, setStory] = useState<StoryEntry[]>([
    {
      type: 'scene',
      content: "🌟 **The Whispering Willow Tavern** 🌟\n\nWarm golden light spills from diamond-paned windows as you step into the coziest tavern in all of Brightmeadow. The air is filled with the scent of honey cakes and chamomile tea. A cheerful fire crackles in the stone hearth, casting dancing shadows on walls lined with colorful tapestries depicting friendly dragons and laughing pixies.\n\nBehind the bar, a jolly halfling innkeeper with rosy cheeks hums a merry tune while polishing tankards that gleam like stars. Several other travelers sit at round wooden tables—a wise-looking owl perched on a wizard's shoulder, a talking badger wearing a tiny vest, and a group of giggling fairy folk sharing stories over steaming mugs.\n\nAs you settle in, you notice a shimmering piece of parchment has appeared on your table, as if by magic!",
      choices: [
        "Read the mysterious parchment that appeared",
        "Approach the friendly innkeeper for local gossip",
        "Join the talking badger's table for stories",
        "Follow the fairy folk outside to see what adventure awaits"
      ],
      timestamp: new Date()
    }
  ]);

  const [isThinking, setIsThinking] = useState(false);

  const handleChoice = async (choice: string) => {
    setIsThinking(true);
    
    // Add player's choice to story
    setStory(prev => [...prev, {
      type: 'choice',
      content: `**You chose:** ${choice}`,
      timestamp: new Date()
    }]);

    // Simulate AI response delay
    setTimeout(() => {
      let response = "";
      let newChoices: string[] = [];

      // Simple branching logic for demo
      if (choice.includes("parchment")) {
        response = "📜 **The Magical Message** 📜\n\nAs you unfurl the shimmering parchment, elegant script appears in golden ink that seems to dance on the page:\n\n*'Dear Kind-Hearted Adventurer,\nThe Crystal Gardens of Moonhaven are in need of a gentle soul. Our rainbow flowers have lost their colors, and only someone with a pure heart can help them bloom again. Follow the Butterfly Bridge past the Giggling Grove, and you shall find us.\nWith hope and fairy dust,\n~ Elder Blossom'*\n\nThe innkeeper notices your reading and approaches with a warm smile. 'Ah, you've received one of Elder Blossom's messages! She only sends those to very special people. The Crystal Gardens haven't had their colors for three whole seasons now.'";
        newChoices = [
          "Accept the quest and ask for directions to Butterfly Bridge",
          "Ask the innkeeper more about Elder Blossom and the gardens",
          "Invite the talking badger to join you on this quest",
          "Order a magical meal to prepare for the journey ahead"
        ];
      } else if (choice.includes("innkeeper")) {
        response = "🍯 **The Cheerful Innkeeper** 🍯\n\nThe rosy-cheeked halfling beams at you with eyes that twinkle like stars. 'Welcome, welcome to the Whispering Willow! I'm Pippin Honeybottom, and this here's the friendliest tavern in seven kingdoms!' He leans in conspiratorially, his voice warm as fresh bread.\n\n'Now, I don't mean to eavesdrop, but that talking badger over there—Professor Bristlewhiskers—was just telling the most fascinating tale about singing mushrooms in the Harmony Hills. And those fairy folk? They're planning a moonlight picnic in the Starfall Meadows tonight!'\n\nHe winks and slides a plate of rainbow cookies across the bar. 'These are on the house for new friends!'";
        newChoices = [
          "Ask about Professor Bristlewhiskers and the singing mushrooms",
          "Inquire about joining the fairy folk's moonlight picnic",
          "Share one of your own adventures with Pippin",
          "Ask if there are any guests in need of help around here"
        ];
      } else if (choice.includes("badger")) {
        response = "🦡 **Professor Bristlewhiskers** 🦡\n\nThe distinguished badger adjusts his tiny spectacles and tips his velvet vest as you approach. 'Ah, a fellow seeker of wonders! Please, please, do sit down!' His voice is warm and scholarly, like a favorite teacher.\n\n'I was just regaling these good folk with tales of the Harmony Hills, where the mushrooms sing the most beautiful lullabies at twilight. But recently, something peculiar has happened—they've all gone silent! I fear they may be too shy to sing, or perhaps they've simply forgotten their melodies.'\n\nHe strokes his whiskers thoughtfully. 'I was planning to visit them tomorrow with some encouragement—perhaps a few kind words and some of Pippin's famous honey cakes. Would you care to join me on this gentle mission?'";
        newChoices = [
          "Agree to help the shy singing mushrooms tomorrow",
          "Ask Professor Bristlewhiskers about other magical places",
          "Suggest visiting the mushrooms tonight under the stars",
          "Offer to bring musical instruments to help them remember their songs"
        ];
      } else {
        response = "✨ **Following the Fairy Folk** ✨\n\nThe group of giggling fairy folk—no taller than your hand but bright as jewels—flutter their gossamer wings excitedly as you show interest in their plans. The leader, a fairy with hair like spun moonlight, chimes like tiny silver bells when she speaks.\n\n'Oh wonderful! A big-person friend!' She twirls in the air, leaving a trail of glittering stardust. 'We're having a midnight celebration in Starfall Meadows—the shooting stars are particularly chatty tonight, and we always throw them a party when they visit!'\n\nAnother fairy, this one with wings like autumn leaves, adds, 'We could use someone tall to help hang the constellation garlands in the old oak tree! Plus, the star-sprites love meeting new friends. They might even grant you a tiny wish!'";
        newChoices = [
          "Join the fairy folk for their magical star party",
          "Ask if you can help prepare decorations for the celebration",
          "Inquire about the wishes that star-sprites grant",
          "Suggest inviting Professor Bristlewhiskers and others to join the party"
        ];
      }

      setStory(prev => [...prev, {
        type: 'scene',
        content: response,
        choices: newChoices,
        timestamp: new Date()
      }]);

      setIsThinking(false);
    }, 2000);
  };

  const startNewAdventure = () => {
    setStory([{
      type: 'scene',
      content: "🌟 **The Whispering Willow Tavern** 🌟\n\nWarm golden light spills from diamond-paned windows as you step into the coziest tavern in all of Brightmeadow. The air is filled with the scent of honey cakes and chamomile tea. A cheerful fire crackles in the stone hearth, casting dancing shadows on walls lined with colorful tapestries depicting friendly dragons and laughing pixies.\n\nBehind the bar, a jolly halfling innkeeper with rosy cheeks hums a merry tune while polishing tankards that gleam like stars. Several other travelers sit at round wooden tables—a wise-looking owl perched on a wizard's shoulder, a talking badger wearing a tiny vest, and a group of giggling fairy folk sharing stories over steaming mugs.\n\nAs you settle in, you notice a shimmering piece of parchment has appeared on your table, as if by magic!",
      choices: [
        "Read the mysterious parchment that appeared",
        "Approach the friendly innkeeper for local gossip",
        "Join the talking badger's table for stories",
        "Follow the fairy folk outside to see what adventure awaits"
      ],
      timestamp: new Date()
    }]);
    setGameState({
      playerName: "Adventurer",
      inventory: ["A worn leather pouch", "A lucky charm"],
      health: 100,
      location: "The Whispering Willow Tavern",
      companions: []
    });
  };

  const latestEntry = story[story.length - 1];

  return (
    <div className="min-h-screen bg-gradient-parchment p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            <Sparkles className="text-primary animate-sparkle" />
            Lovable AI Dungeon Master
            <Sparkles className="text-primary animate-sparkle" />
          </h1>
          <p className="text-muted-foreground">Your friendly guide through whimsical fantasy adventures</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Character Info Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="text-accent w-5 h-5" />
                  Character
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">{gameState.playerName}</p>
                  <p className="text-sm text-muted-foreground">Health: {gameState.health}%</p>
                  <p className="text-sm text-muted-foreground">Location: {gameState.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-warm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Backpack className="text-secondary w-5 h-5" />
                  Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {gameState.inventory.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {gameState.companions.length > 0 && (
              <Card className="shadow-warm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-accent w-5 h-5" />
                    Companions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {gameState.companions.map((companion, index) => (
                      <li key={index} className="text-sm text-muted-foreground">• {companion}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Button 
              variant="adventure" 
              size="lg" 
              className="w-full" 
              onClick={startNewAdventure}
            >
              <Scroll className="w-4 h-4" />
              New Adventure
            </Button>
          </div>

          {/* Main Story Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-magical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scroll className="text-primary w-6 h-6" />
                  Your Adventure Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-6">
                    {story.map((entry, index) => (
                      <div key={index} className="space-y-3">
                        {entry.type === 'choice' ? (
                          <div className="text-primary font-medium italic text-sm">
                            {entry.content}
                          </div>
                        ) : (
                          <div className="prose prose-sm max-w-none">
                            <div 
                              className="text-foreground leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{ 
                                __html: entry.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isThinking && (
                      <div className="flex items-center gap-2 text-muted-foreground italic">
                        <Sparkles className="w-4 h-4 animate-sparkle" />
                        The Dungeon Master is weaving your story...
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Choice Buttons */}
                {latestEntry && latestEntry.choices && !isThinking && (
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold text-foreground mb-3">What do you choose to do?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {latestEntry.choices.map((choice, index) => (
                        <Button
                          key={index}
                          variant="choice"
                          size="lg"
                          className="h-auto p-4 text-left justify-start"
                          onClick={() => handleChoice(choice)}
                        >
                          <span className="text-sm leading-relaxed">{choice}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DungeonMaster;