# 📰 Dhakad News App

A modern, feature-rich React Native news application built with Expo that provides users with the latest news from around the world. The app offers a clean, intuitive interface with category-based news filtering, search functionality, and detailed news reading experience.

## 📱 Screenshots & Demo

### App Demo Video

<div align="center">
  <video width="300" height="600" controls>
    <source src="https://github.com/user-attachments/assets/f25604d5-ae7f-40aa-b103-64b0501b8cfe" type="video/webm">
    Your browser does not support the video tag.
  </video>
</div>

### Mobile Screenshots

<div align="center">
  <img width="200" height="450" alt="Home Screen" src="https://github.com/user-attachments/assets/396dc674-5fcf-4b97-a8b1-ef68aae4dc3a" />
  <img width="200" height="450" alt="News Details" src="https://github.com/user-attachments/assets/1b8de6f0-7d46-4626-937f-5b8bb5a60a77" />
  <img width="200" height="450" alt="Search Screen" src="https://github.com/user-attachments/assets/1db80e0c-b513-4c05-99a6-ea434083aa49" />
</div>

## ✨ Features

- **📰 Latest News**: Get real-time news updates from NewsData.io API
- **🏷️ Category Filtering**: Browse news by categories (Politics, Science, Entertainment, Sports, Technology, Business)
- **🔍 Search Functionality**: Search for specific news articles
- **📱 Responsive Design**: Optimized for both mobile and tablet devices
- **🌐 Multi-platform**: Works on iOS, Android, and Web
- **⚡ Fast Loading**: Efficient data fetching with loading states
- **🔄 Error Handling**: Robust error handling with retry functionality
- **📖 Detailed View**: Full article reading experience with images and metadata
- **🎨 Modern UI**: Clean, intuitive interface with smooth navigation

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **HTTP Client**: Axios
- **Icons**: Expo Vector Icons
- **Styling**: React Native StyleSheet
- **State Management**: React Hooks (useState, useEffect)
- **API**: NewsData.io News API

## 📦 Dependencies

### Core Dependencies

- `expo`: ~53.0.22
- `react`: 19.0.0
- `react-native`: 0.79.5
- `@react-navigation/native`: ^7.1.17
- `@react-navigation/bottom-tabs`: ^7.4.7
- `@react-navigation/native-stack`: ^7.3.26
- `axios`: ^1.11.0

### UI & Icons

- `@expo/vector-icons`: ^14.1.0
- `expo-linear-gradient`: ~14.1.5
- `react-native-reanimated`: ~3.17.4
- `react-native-safe-area-context`: 5.4.0

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/DhakadNewsApp.git
   cd DhakadNewsApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your NewsData.io API key:

   ```env
   EXPO_PUBLIC_NEWS_API_KEY=your_newsdata_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on specific platforms**

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📁 Project Structure

```
DhakadNewsApp/
├── components/           # Reusable UI components
│   ├── home/            # Home screen components
│   │   ├── BrakingNews.js
│   │   ├── Categories.js
│   │   ├── Header.js
│   │   ├── NewsList.js
│   │   └── Searchbar.js
│   ├── Loader.js
│   └── newsdetails/     # News details components
├── constants/           # App constants and configurations
│   ├── CategoriesList.js
│   ├── Colors.js
│   ├── CountryList.js
│   └── Icons.js
├── hook/               # Custom React hooks
│   ├── useCategoryFilter.js
│   └── useContryFilter.js
├── navigation/         # Navigation configuration
│   └── TabNavigation.js
├── screens/           # Main app screens
│   ├── HomeScreen.js
│   ├── NewsDetailsScreen.js
│   ├── SearchScreen.js
│   ├── DiscoverScreen.js
│   └── ProfileScreen.js
├── intro/             # Introduction screens
│   └── IntroScreen.js
├── assets/            # Images and static assets
├── App.js            # Main app component
└── package.json      # Dependencies and scripts
```

## 🎯 Key Features Implementation

### News Categories

The app supports filtering news by the following categories:

- All
- Politics
- Science
- Entertainment
- Sports
- Technology
- Business

### API Integration

- Uses NewsData.io API for fetching news
- Implements proper error handling and loading states
- Supports image loading with fallbacks
- Timeout handling for network requests

### Navigation

- Stack navigation for main app flow
- Bottom tab navigation for main sections
- Proper header configuration for each screen

## 🔧 Configuration

### Environment Variables

Make sure to set up your environment variables properly:

```env
EXPO_PUBLIC_NEWS_API_KEY=your_newsdata_api_key
```

### API Key Setup

1. Visit [NewsData.io](https://newsdata.io/) to get your API key
2. Add the key to your `.env` file
3. Restart your development server

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web
- ✅ Tablet (iPad/Android tablets)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NewsData.io](https://newsdata.io/) for providing the news API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Navigation](https://reactnavigation.org/) for navigation solutions

## 📞 Support

If you have any questions or need help with the project, please feel free to:

- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ using React Native and Expo**
