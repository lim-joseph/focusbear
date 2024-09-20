import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Signup() {
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState(""); // State to hold error messages

	// Email validation function
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Function to handle signup
	const handleSignup = async () => {
		// Check if all fields are filled
		if (!email || !password || !confirmPassword || !name) {
			setError("All fields must be filled.");
			return;
		}

		// Validate email
		if (!validateEmail(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		// Check if passwords match
		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		// Clear error if validation passes
		setError("");

		// Perform the signup request
		try {
			const response = await fetch("http://localhost:3000/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					name: name,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log("Signup Successful:", data);
				router.push("/home"); // Redirect after successful signup
			} else {
				const errorData = await response.json();
				setError(`Signup Failed: ${errorData.message}`);
			}
		} catch (error) {
			setError("An unexpected error occurred. Please try again.");
		}
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/partial-react-logo.png")}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">🐻 FocusBear</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Sign Up</ThemedText>

				{/* Error Message Display */}
				{error ? (
					<ThemedText style={styles.errorText}>{error}</ThemedText>
				) : null}

				<TextInput
					style={styles.input}
					placeholder="Name"
					keyboardType="default"
					value={name}
					onChangeText={setName}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					secureTextEntry
					value={confirmPassword}
					onChangeText={setConfirmPassword}
				/>
				<Button title="Sign Up" onPress={handleSignup} />

				<TouchableOpacity
					style={styles.loginButton}
					onPress={() => {
						/* Handle login navigation */
					}}
				>
					<ThemedText style={styles.loginText}>
						Already have an account? Log In
					</ThemedText>
				</TouchableOpacity>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
		padding: 16,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 8,
		marginBottom: 12,
		borderRadius: 4,
	},
	loginButton: {
		marginTop: 12,
	},
	loginText: {
		color: "#007BFF",
		textAlign: "center",
	},
	errorText: {
		color: "red",
		marginBottom: 10,
	},
});
