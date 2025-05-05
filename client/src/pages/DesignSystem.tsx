import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SectionContainer } from "@/components/ui/section-container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Zap, Network, ArrowRight, Code } from "lucide-react";

export default function DesignSystem() {
  const [activeTab, setActiveTab] = useState("colors");
  
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.focus();
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header 
        onFeatureClick={() => navigateToSection('components')}
        onBenefitsClick={() => navigateToSection('typography')}
        onTechnologyClick={() => navigateToSection('colors')}
        onWaitlistClick={() => navigateToSection('spacing')}
        onFaqClick={() => navigateToSection('patterns')}
      />
      
      <main className="pt-20" id="main-content" tabIndex={-1}>
        <SectionContainer className="py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">PeoChain Design System</h1>
            <p className="text-xl text-foreground/80 mb-8">
              A comprehensive guide to our design tokens, components, and patterns for consistent UI development.
            </p>
            
            <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="spacing">Spacing</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
              </TabsList>
              
              {/* Colors */}
              <TabsContent value="colors" id="colors" tabIndex={-1} className="focus:outline-none">
                <Card>
                  <CardHeader>
                    <CardTitle>Color System</CardTitle>
                    <CardDescription>
                      Our color palette is designed for accessibility and brand consistency.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Primary Colors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-6 bg-primary rounded-lg flex flex-col items-center justify-center text-primary-foreground h-24">
                            <span className="font-medium">Primary</span>
                            <span className="text-sm opacity-80">hsl(var(--primary))</span>
                          </div>
                          <div className="p-6 bg-primary/20 rounded-lg flex flex-col items-center justify-center text-foreground h-24">
                            <span className="font-medium">Primary Light</span>
                            <span className="text-sm opacity-80">hsl(var(--primary) / 0.2)</span>
                          </div>
                          <div className="p-6 bg-primary-foreground rounded-lg flex flex-col items-center justify-center text-primary h-24">
                            <span className="font-medium">Primary Foreground</span>
                            <span className="text-sm opacity-80">hsl(var(--primary-foreground))</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Secondary Colors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-6 bg-secondary rounded-lg flex flex-col items-center justify-center text-secondary-foreground h-24">
                            <span className="font-medium">Secondary</span>
                            <span className="text-sm opacity-80">hsl(var(--secondary))</span>
                          </div>
                          <div className="p-6 bg-secondary/20 rounded-lg flex flex-col items-center justify-center text-foreground h-24">
                            <span className="font-medium">Secondary Light</span>
                            <span className="text-sm opacity-80">hsl(var(--secondary) / 0.2)</span>
                          </div>
                          <div className="p-6 bg-secondary-foreground rounded-lg flex flex-col items-center justify-center text-secondary h-24">
                            <span className="font-medium">Secondary Foreground</span>
                            <span className="text-sm opacity-80">hsl(var(--secondary-foreground))</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Background & Foreground</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-6 bg-background border border-border rounded-lg flex flex-col items-center justify-center text-foreground h-24">
                            <span className="font-medium">Background</span>
                            <span className="text-sm opacity-80">hsl(var(--background))</span>
                          </div>
                          <div className="p-6 bg-muted rounded-lg flex flex-col items-center justify-center text-muted-foreground h-24">
                            <span className="font-medium">Muted</span>
                            <span className="text-sm opacity-80">hsl(var(--muted))</span>
                          </div>
                          <div className="p-6 bg-foreground rounded-lg flex flex-col items-center justify-center text-background h-24">
                            <span className="font-medium">Foreground</span>
                            <span className="text-sm opacity-80">hsl(var(--foreground))</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Accent & UI Colors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="p-6 bg-accent rounded-lg flex flex-col items-center justify-center text-accent-foreground h-24">
                            <span className="font-medium">Accent</span>
                            <span className="text-sm opacity-80">hsl(var(--accent))</span>
                          </div>
                          <div className="p-6 bg-card rounded-lg flex flex-col items-center justify-center text-card-foreground h-24 border border-border">
                            <span className="font-medium">Card</span>
                            <span className="text-sm opacity-80">hsl(var(--card))</span>
                          </div>
                          <div className="p-6 bg-popover rounded-lg flex flex-col items-center justify-center text-popover-foreground h-24 border border-border">
                            <span className="font-medium">Popover</span>
                            <span className="text-sm opacity-80">hsl(var(--popover))</span>
                          </div>
                          <div className="p-6 bg-destructive rounded-lg flex flex-col items-center justify-center text-destructive-foreground h-24">
                            <span className="font-medium">Destructive</span>
                            <span className="text-sm opacity-80">hsl(var(--destructive))</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Chart Colors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <div 
                              key={num}
                              className={`p-6 rounded-lg flex flex-col items-center justify-center text-foreground h-24`}
                              style={{ backgroundColor: `hsl(var(--chart-${num}))` }}
                            >
                              <span className="font-medium">Chart {num}</span>
                              <span className="text-sm opacity-80">hsl(var(--chart-{num}))</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Typography */}
              <TabsContent value="typography" id="typography" tabIndex={-1} className="focus:outline-none">
                <Card>
                  <CardHeader>
                    <CardTitle>Typography</CardTitle>
                    <CardDescription>
                      Our typography system uses Inter for body text and Poppins for headings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Headings (Poppins)</h3>
                        <div className="space-y-4">
                          <div className="p-4 border border-border rounded-lg">
                            <h1 className="font-poppins text-4xl font-bold">Heading 1 (text-4xl)</h1>
                            <p className="text-sm text-muted-foreground mt-2">Used for main page titles</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <h2 className="font-poppins text-3xl font-bold">Heading 2 (text-3xl)</h2>
                            <p className="text-sm text-muted-foreground mt-2">Used for section headings</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <h3 className="font-poppins text-2xl font-semibold">Heading 3 (text-2xl)</h3>
                            <p className="text-sm text-muted-foreground mt-2">Used for subsection headings</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <h4 className="font-poppins text-xl font-semibold">Heading 4 (text-xl)</h4>
                            <p className="text-sm text-muted-foreground mt-2">Used for card titles</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <h5 className="font-poppins text-lg font-medium">Heading 5 (text-lg)</h5>
                            <p className="text-sm text-muted-foreground mt-2">Used for smaller headings</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Body Text (Inter)</h3>
                        <div className="space-y-4">
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-xl">Large Text (text-xl)</p>
                            <p className="text-sm text-muted-foreground mt-2">Used for hero text and introductions</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-lg">Medium Text (text-lg)</p>
                            <p className="text-sm text-muted-foreground mt-2">Used for important body text</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-base">Regular Text (text-base)</p>
                            <p className="text-sm text-muted-foreground mt-2">Used for standard body text</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-sm">Small Text (text-sm)</p>
                            <p className="text-sm text-muted-foreground mt-2">Used for captions and helper text</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="text-xs">Extra Small Text (text-xs)</p>
                            <p className="text-sm text-muted-foreground mt-2">Used for legal text and footnotes</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Font Weights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-normal">Normal (font-normal)</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-medium">Medium (font-medium)</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-semibold">Semibold (font-semibold)</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-bold">Bold (font-bold)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Spacing */}
              <TabsContent value="spacing" id="spacing" tabIndex={-1} className="focus:outline-none">
                <Card>
                  <CardHeader>
                    <CardTitle>Spacing System</CardTitle>
                    <CardDescription>
                      Our spacing system follows a consistent scale for margins, padding, and gaps.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Spacing Scale</h3>
                        <div className="space-y-4">
                          {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((size) => (
                            <div key={size} className="flex items-center">
                              <div className={`w-${size} h-8 bg-primary rounded-md mr-4`}></div>
                              <div>
                                <p className="font-medium">Space {size} ({size * 0.25}rem)</p>
                                <p className="text-sm text-muted-foreground">p-{size}, m-{size}, gap-{size}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Section Spacing</h3>
                        <div className="space-y-4">
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-medium">Section Padding</p>
                            <p className="text-sm text-muted-foreground">py-16 md:py-24 (4rem/6rem)</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-medium">Container Horizontal Padding</p>
                            <p className="text-sm text-muted-foreground">px-4 md:px-8 (1rem/2rem)</p>
                          </div>
                          <div className="p-4 border border-border rounded-lg">
                            <p className="font-medium">Component Spacing</p>
                            <p className="text-sm text-muted-foreground">space-y-6 (1.5rem)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Components */}
              <TabsContent value="components" id="components" tabIndex={-1} className="focus:outline-none">
                <Card>
                  <CardHeader>
                    <CardTitle>UI Components</CardTitle>
                    <CardDescription>
                      Our component library provides consistent, accessible UI elements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-12">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Buttons</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="flex flex-col items-center space-y-2">
                            <Button>Default</Button>
                            <span className="text-sm text-muted-foreground">Default</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button variant="secondary">Secondary</Button>
                            <span className="text-sm text-muted-foreground">Secondary</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button variant="outline">Outline</Button>
                            <span className="text-sm text-muted-foreground">Outline</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button variant="ghost">Ghost</Button>
                            <span className="text-sm text-muted-foreground">Ghost</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button variant="link">Link</Button>
                            <span className="text-sm text-muted-foreground">Link</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button variant="destructive">Destructive</Button>
                            <span className="text-sm text-muted-foreground">Destructive</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button disabled>Disabled</Button>
                            <span className="text-sm text-muted-foreground">Disabled</span>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <Button>
                              <ArrowRight className="mr-2 h-4 w-4" />
                              With Icon
                            </Button>
                            <span className="text-sm text-muted-foreground">With Icon</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Cards</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle>Card Title</CardTitle>
                              <CardDescription>Card description text goes here</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <p>This is the main content area of the card component.</p>
                            </CardContent>
                            <CardFooter>
                              <Button>Action</Button>
                            </CardFooter>
                          </Card>
                          
                          <div className="space-y-6">
                            <FeatureCard
                              title="Feature Card"
                              description="This is a feature card component used to highlight features with an icon."
                              icon={<Shield className="h-5 w-5 text-primary" />}
                            />
                            
                            <FeatureCard
                              title="Feature Card (Primary)"
                              description="This is a primary variant of the feature card."
                              icon={<Zap className="h-5 w-5 text-primary" />}
                              variant="primary"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Section Container</h3>
                        <SectionContainer className="bg-muted p-6 rounded-lg border border-border">
                          <div className="text-center">
                            <h4 className="text-lg font-medium mb-2">Section Container Component</h4>
                            <p className="text-muted-foreground">
                              This component provides consistent section spacing and layout.
                            </p>
                          </div>
                        </SectionContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Patterns */}
              <TabsContent value="patterns" id="patterns" tabIndex={-1} className="focus:outline-none">
                <Card>
                  <CardHeader>
                    <CardTitle>UI Patterns</CardTitle>
                    <CardDescription>
                      Common UI patterns and compositions used throughout the application.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-12">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Feature Grid</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FeatureCard
                            title="Scalability"
                            description="Process 100,000+ transactions per second with near-instant finality."
                            icon={<Zap className="h-5 w-5 text-primary" />}
                            variant="primary"
                          />
                          <FeatureCard
                            title="Security"
                            description="Advanced consensus mechanisms with quantum-resistant encryption."
                            icon={<Shield className="h-5 w-5 text-primary" />}
                            variant="primary"
                          />
                          <FeatureCard
                            title="Interoperability"
                            description="Seamless cross-chain integration with all major blockchain networks."
                            icon={<Network className="h-5 w-5 text-primary" />}
                            variant="primary"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Call to Action</h3>
                        <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <h4 className="font-medium text-lg text-foreground mb-1">Ready to experience the future?</h4>
                              <p className="text-foreground/80">Join our waitlist to be among the first to access PEOCHAIN.</p>
                            </div>
                            <Button className="md:flex-shrink-0">
                              <span>Join the Waitlist</span>
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Section Header</h3>
                        <div className="text-center max-w-3xl mx-auto mb-12">
                          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
                            Section Title
                          </h2>
                          <p className="text-foreground/80 text-lg md:text-xl leading-relaxed">
                            This is a standard section header pattern with a title and description text that explains the purpose of the section.
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Icon Feature List</h3>
                        <div className="space-y-4">
                          {[
                            { icon: <Zap className="h-5 w-5 text-primary" />, title: "High Performance", description: "100,000+ TPS with near-instant finality" },
                            { icon: <Code className="h-5 w-5 text-primary" />, title: "Developer Friendly", description: "Comprehensive SDKs and unified API" },
                            { icon: <Shield className="h-5 w-5 text-primary" />, title: "Enterprise Security", description: "Quantum-resistant encryption protocols" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start">
                              <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 mr-4">
                                {item.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground">{item.title}</h4>
                                <p className="text-foreground/70 text-sm">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SectionContainer>
      </main>
      
      <Footer />
    </div>
  );
}
