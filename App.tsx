import "@walletconnect/react-native-compat";
import { AppKitButton } from "@reown/appkit-ethers-react-native";
import {
    createAppKit,
    defaultConfig,
    AppKit,
} from "@reown/appkit-ethers-react-native";
import { StatusBar } from 'expo-status-bar'; // Or 'react-native' if not using Expo
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 1. Get projectId from https://cloud.reown.com
// IMPORTANT: Replace "YOUR_PROJECT_ID" with your actual project ID from Reown Cloud.
const projectId = "c74306af65922614292f1ebc3749e402";

// 2. Create config
const metadata = {
    name: "CDApps", // Your App Name
    description: "Blockchain-based cinema ticket booking.", // Your App Description
    url: "https://cdapps.example.com", // Replace with your app's website or a relevant URL
    icons: ["https://avatars.githubusercontent.com/u/179229932"], // Replace with your app's icon URL(s)
    redirect: {
        native: "cdapps://", // IMPORTANT: Replace "cdapps://" with your actual app scheme.
        // universal: "YOUR_APP_UNIVERSAL_LINK.com" // Optional: if you have universal links
    },
};

// Note: defaultConfig is deprecated. You might need to use configureChains and createConfig from wagmi/core
// or follow the latest documentation for @reown/appkit-ethers-react-native if it has its own config setup.
// For now, assuming defaultConfig is still usable or you'll adapt this part.
const config = defaultConfig({ metadata });

// 3. Define your chains
// These are examples, you can add or remove chains as needed for your dApp.
const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
};

const polygon = {
    chainId: 137,
    name: "Polygon",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com",
};

// Add other chains relevant to your cinema ticket booking (e.g., a testnet or a specific L2)
const chains = [mainnet, polygon];

// 4. Create modal
// This initializes the AppKit. It should be called once, typically at the root of your application.
createAppKit({
    projectId,
    chains,
    config, // This might need adjustment based on the latest @reown/appkit version
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    // Optional: Add themeVariables, termsOfServiceUrl, privacyPolicyUrl, etc.
});

export default function App() {
    return (
        <>
            {/* This View is the main container for your app's UI */}
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to CDApps!</Text>
                <Text style={styles.subtitle}>Blockchain Cinema Tickets</Text>
                {/* The AppKitButton will trigger the wallet connection modal */}
                <AppKitButton />
                <StatusBar style="auto" />
            </View>

            {/* AppKit is the modal provider, it should be rendered at the root */}
            <AppKit />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Dark background for a cinema feel
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e0e0e0', // Light text color
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#b0b0b0', // Slightly dimmer text color
        marginBottom: 30,
        textAlign: 'center',
    },
    // You can add more styles for other components here
    // AppKitButton might have its own styling or you can pass style props if the library allows.
});
