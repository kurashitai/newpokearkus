export default function WikiSubpage() {
  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-background via-primary/5 to-purple-500/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Pokemon Wiki</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive Pokemon guides and documentation
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-8 border">
            <h2 className="text-2xl font-semibold mb-6">Guide Content</h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                This section contains detailed information about Pokemon mechanics, strategies, and guides.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-background rounded-lg p-4 border">
                  <h3 className="font-semibold mb-2">📖 Documentation</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed guides and explanations for Pokemon mechanics.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-4 border">
                  <h3 className="font-semibold mb-2">⚡ Strategies</h3>
                  <p className="text-sm text-muted-foreground">
                    Battle strategies and team building recommendations.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-4 border">
                  <h3 className="font-semibold mb-2">🔧 Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Helpful tools and calculators for Pokemon trainers.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-4 border">
                  <h3 className="font-semibold mb-2">🎯 Tips</h3>
                  <p className="text-sm text-muted-foreground">
                    Pro tips and tricks for efficient Pokemon training.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}