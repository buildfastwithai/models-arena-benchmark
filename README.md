# 🚀 Build Fast Arena Benchmark

A real-time AI model comparison platform that allows you to test and compare multiple AI models simultaneously for code generation tasks. Built with Next.js 15, [AI SDK](https://ai-sdk.dev/), TypeScript, and OpenRouter API integration.

## ✨ Features

### 🔥 **Real-time Model Comparison**

- **Dynamic Panels**: Add or remove model comparison panels on-the-fly
- **Side-by-Side View**: Compare multiple AI models simultaneously

### 🎯 **Dynamic Model Management**

- **Flexible Setup**: Start with 2 models, expand to test 3, 4, 5+ models at once
- **Easy Controls**: Simple `+`/`-` buttons to add/remove comparison panels
- **Model Selection**: Choose multiple models via OpenRouter
- **Independent Loading**: Each model shows its own loading state

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- OpenRouter API key ([Get one here](https://openrouter.ai/settings/keys))
- Basic understanding of [AI SDK](https://ai-sdk.dev/) (optional, for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/buildfastwithai/models-arena-benchmark.git
   cd models-arena-benchmark
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Setup

1. **Get OpenRouter API Key**

   - Sign up at [OpenRouter](https://openrouter.ai)
   - Go to [Settings → Keys](https://openrouter.ai/settings/keys)
   - Create a new API key

2. **Configure the App**
   - Enter your API key in the sidebar
   - Select your preferred AI models
   - Start comparing!

## 🎮 How to Use

### Step 1: API Configuration

- Enter your OpenRouter API key in the sidebar
- Click the external link icon to quickly access your API keys page
- Your key is automatically saved locally for future sessions

### Step 2: Model Selection

- Choose AI models for each comparison panel
- Use the `+` button to add more comparison panels
- Use the `×` button to remove panels (minimum 1 required)

### Step 3: Generate & Compare

- Enter your prompt in the input box at the bottom
- Click submit to generate code across all selected models
- Watch results appear in real-time as each model completes
- Toggle the eye icon to hide/show the prompt box for full-screen viewing

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **AI Integration**: [AI SDK](https://ai-sdk.dev/) for unified AI provider access
- **Styling**: Tailwind CSS, shadcn/ui components
- **API Integration**: OpenRouter API via AI SDK
- **Icons**: Lucide React

### Key Components

- `Sidebar`: Configuration panel with instructions and branding
- `ModelPanel`: Individual model comparison panel with results
- `ModelPanelHeader`: Panel controls for add/remove functionality
- `PromptBox`: Input interface with toggle visibility
- `CodePreview`: HTML/CSS/JS code preview and execution

### API Endpoints

- `POST /api/generate`: Streams AI model responses in real-time
  - Accepts: `{ prompt: string, models: string[], apiKey: string }`
  - Returns: Server-Sent Events stream with individual model results

## 🔧 Development

### Environment Variables

No environment variables required - all configuration is done through the UI.

### Building for Production

```bash
npm run build
npm start
```

## 🎯 Use Cases

### **For Developers**

- **Model Selection**: Find the best AI model for your specific coding tasks
- **Performance Testing**: Compare response times and code quality
- **Prompt Engineering**: Test how different models respond to the same prompts

### **For Researchers**

- **Benchmarking**: Systematic comparison of AI model capabilities
- **Quality Analysis**: Side-by-side evaluation of generated code
- **Documentation**: Screenshot and document model performance differences

### **For Teams**

- **Model Evaluation**: Team decision-making for AI model adoption
- **Demos**: Showcase AI capabilities to stakeholders
- **Training**: Understand different AI model strengths and weaknesses

## 🌟 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use the existing component patterns
- Ensure responsive design compatibility
- Test with multiple AI models

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Issues**: Report bugs via [GitHub Issues](https://github.com/buildfastwithai/models-arena-benchmark/issues)
- **AI SDK Documentation**: Learn more about [AI SDK](https://ai-sdk.dev/) for AI integrations
- **Course**: Learn to build apps like this with our [Gen AI Launchpad](https://buildfastwithai.com/genai-course)
- **Website**: Check out [Build Fast with AI](https://buildfastwithai.com)

---

**Built with ❤️ by [Build Fast with AI](https://buildfastwithai.com)**

_Want to learn how to build apps like this? Check out our [Gen AI Launchpad Course](https://buildfastwithai.com/genai-course)_
