import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import Right from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const WashingMachine = () => {
   const [modalVisible, setModalVisible] = useState(false);

   const navigation = useNavigation()

   const data = {
      WashingMachineService: [
         {
            id: 1,
            latitude: 21.2808817,
            longitude: 70.212965,
            price: 150,
            serviceName: "Washing Machine Service Hub",
            location: "Near XYZ Plaza, Ahmedabad, Gujarat",
            contactNumber: "+91 9123456780",
            amenities: [
               "Drum Cleaning",
               "Motor Check",
               "Water Pump Inspection",
               "Hose Replacement",
            ],
            workingHours: "10:00 AM - 8:00 PM",
            services: [
               "Washing Machine Maintenance",
               "Filter Cleaning",
               "Motor Lubrication",
               "Leak Fix",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Credit/Debit Cards",
            ],
            loyaltyProgram: "Free drum cleaning on every 5th service",
            reviews: [
               {
                  customer: "Rajesh Patel",
                  rating: 4.5,
                  comment: "Reliable service and great customer support.",
               },
               {
                  customer: "Neha Shah",
                  rating: 4.7,
                  comment: "My washing machine works like new!",
               },
            ],
            rating: 4.6,
         },
         {
            id: 2,
            latitude: 21.3009817,
            longitude: 71.232975,
            price: 200,
            serviceName: "Smart Washing Machine Care",
            location: "Sector 15, Gandhinagar, Gujarat",
            contactNumber: "+91 9212345678",
            amenities: [
               "Filter Replacement",
               "Pump Cleaning",
               "Belt Adjustment",
               "Leak Fix",
            ],
            workingHours: "9:00 AM - 7:00 PM",
            services: [
               "Washing Machine Servicing",
               "Water Leak Prevention",
               "Belt Tension Adjustment",
               "Filter Cleaning",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Bank Transfers",
            ],
            loyaltyProgram: "10% off for first-time users",
            reviews: [
               {
                  customer: "Amit Rathi",
                  rating: 4.8,
                  comment: "Very fast and professional service!",
               },
               {
                  customer: "Sushma Gupta",
                  rating: 4.6,
                  comment: "Good value for the price.",
               },
            ],
            rating: 4.7,
         },
         {
            id: 3,
            latitude: 22.3295,
            longitude: 73.1818,
            price: 200,
            serviceName: "Smart Washing Machine Care",
            location: "Sector 15, Gandhinagar, Gujarat",
            contactNumber: "+91 9212345678",
            amenities: [
               "Filter Replacement",
               "Pump Cleaning",
               "Belt Adjustment",
               "Leak Fix",
            ],
            workingHours: "9:00 AM - 7:00 PM",
            services: [
               "Washing Machine Servicing",
               "Water Leak Prevention",
               "Belt Tension Adjustment",
               "Filter Cleaning",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Bank Transfers",
            ],
            loyaltyProgram: "10% off for first-time users",
            reviews: [
               {
                  customer: "Amit Rathi",
                  rating: 4.8,
                  comment: "Very fast and professional service!",
               },
               {
                  customer: "Sushma Gupta",
                  rating: 4.6,
                  comment: "Good value for the price.",
               },
            ],
            rating: 4.7,
         },
      ],
      WashingMachineRepair: [
         {
            id: 1,
            latitude: 21.2808817,
            longitude: 70.212965,
            price: 250,
            serviceName: "Washing Machine Repair Pros",
            location: "Opposite Green Mall, Rajkot, Gujarat",
            contactNumber: "+91 9876543201",
            amenities: [
               "Motor Repair",
               "Control Panel Fix",
               "Water Pump Replacement",
               "Leakage Repair",
            ],
            workingHours: "9:00 AM - 6:00 PM",
            services: [
               "Washing Machine Motor Repair",
               "Control Panel Fix",
               "Water Leakage Repair",
               "Drainage Problem Fix",
            ],
            paymentMethods: [
               "Cash",
               "Credit Cards",
               "Mobile Wallets",
            ],
            loyaltyProgram: "5% off for referrals",
            reviews: [
               {
                  customer: "Suresh Kumar",
                  rating: 4.9,
                  comment: "Fantastic service and excellent technicians!",
               },
               {
                  customer: "Rina Mehta",
                  rating: 4.3,
                  comment: "Fixed my washing machine quickly.",
               },
            ],
            rating: 4.6,
         },
         {
            id: 2,
            latitude: 21.4007817,
            longitude: 70.315875,
            price: 280,
            serviceName: "Reliable Washing Machine Repair",
            location: "Main Street, Bhavnagar, Gujarat",
            contactNumber: "+91 9345678902",
            amenities: [
               "Motor Diagnostics",
               "Pump Repair",
               "Control Panel Reprogramming",
               "Leak Fixing",
            ],
            workingHours: "8:30 AM - 7:00 PM",
            services: [
               "Washing Machine Motor Diagnostics",
               "Water Pump Repair",
               "Control Panel Fix",
               "Leakage Issue Fix",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Digital Wallets",
            ],
            loyaltyProgram: "Free diagnostics for repeat customers",
            reviews: [
               {
                  customer: "Ravi Joshi",
                  rating: 4.9,
                  comment: "Prompt and efficient service.",
               },
               {
                  customer: "Aruna Patel",
                  rating: 4.7,
                  comment: "Highly satisfied with the repair.",
               },
            ],
            rating: 4.8,
         },
      ],
      WashingMachineInstallation: [
         {
            id: 1,
            latitude: 21.3180,
            longitude: 70.2670,
            price: 350,
            serviceName: "Washing Machine Installation Experts",
            location: "Near City Center, Surat, Gujarat",
            contactNumber: "+91 8765432109",
            amenities: [
               "Proper Setup",
               "Inlet and Drain Hose Installation",
               "Water Supply Connection",
               "Level Adjustment",
            ],
            workingHours: "8:00 AM - 6:00 PM",
            services: [
               "Washing Machine Installation",
               "Inlet/Drain Hose Setup",
               "Level Adjustment",
               "Power and Water Supply Setup",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Credit/Debit Cards",
            ],
            loyaltyProgram: "Free follow-up for alignment issues within 1 month",
            reviews: [
               {
                  customer: "Meena Desai",
                  rating: 4.9,
                  comment: "Professional installation and setup.",
               },
               {
                  customer: "Vijay Shah",
                  rating: 4.8,
                  comment: "Service was on time and efficient.",
               },
            ],
            rating: 4.85,
         },
         {
            id: 2,
            latitude: 22.3258917,
            longitude: 71.295975,
            price: 400,
            serviceName: "Precision Washing Machine Installation",
            location: "Sector 12, Vadodara, Gujarat",
            contactNumber: "+91 9087654321",
            amenities: [
               "Inlet Pipe Installation",
               "Leakage Test",
               "Water Supply Adjustment",
               "Level and Positioning Setup",
            ],
            workingHours: "9:00 AM - 5:30 PM",
            services: [
               "Washing Machine Mount Installation",
               "Hose Setup",
               "Water Supply Adjustment",
               "Level Adjustment",
            ],
            paymentMethods: [
               "Cash",
               "Digital Payments",
               "UPI",
            ],
            loyaltyProgram: "Discounted mounts for referrals",
            reviews: [
               {
                  customer: "Rajeev Kumar",
                  rating: 4.8,
                  comment: "Efficient installation and neat work.",
               },
               {
                  customer: "Suman Thakur",
                  rating: 4.6,
                  comment: "Very satisfied with the service.",
               },
            ],
            rating: 4.7,
         },
      ],
   };



   // Testimonial data
   const testimonialData = [
      {
         id: 1,
         text: "Excellent service! My Washing Machine was repaired within an hour. Highly recommend!",
         author: "John Doe",
      },
      {
         id: 2,
         text: "Fast and reliable! The technician was professional and fixed the issue quickly.",
         author: "Jane Smith",
      },
      {
         id: 3,
         text: "Great experience! My Washing Machine was fixed on the spot, and the customer service was top-notch.",
         author: "Michael Johnson",
      },
   ];


   const serviceData = [
      {
         id: 1,
         title: "Washing Machine Service",
         price: "Starting at ₹499",
         image: require("../../../img/washingmachine1.jpg"),
      },
      {
         id: 2,
         title: "Washing Machine Repair",
         price: "Quick Fixes",
         image: require("../../../img/washingmachine2.jpg"),

      },
      {
         id: 3,
         title: "Washing Machine Installation",
         price: "Affordable Setup",
         image: require("../../../img/washingmachine3.jpg"),

      },
   ];


   const handleclick = (item) => {
      console.log(item.id)
      if (item.id === 1) {
         navigation.navigate('BookingScreen', { type: 'WashingMachineService', data: data.WashingMachineService });
      } if (item.id === 2) {
         navigation.navigate('BookingScreen', { type: 'WashingMachineRepair', data: data.WashingMachineRepair });
      } if (item.id === 3) {
         navigation.navigate('BookingScreen', { type: 'WashingMachineInstallation', data: data.WashingMachineInstallation });
      }
   }
   return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
         {/* Video Section */}
         <View style={styles.videoContainer}>
            <Video
               source={require("../../../video/washingmachine.mp4")} // Replace with your video URL
               style={styles.video}
               resizeMode="cover"
               useNativeControls
               isLooping
               shouldPlay={true} // Enable autoplay
            />
         </View>

         {/* Title Section */}
         <View style={styles.titleSection}>
            <Text style={styles.title}>Washing Machine Repair & Service</Text>
            <View style={styles.ratingRow}>
               <Icon name="star" size={16} color="#FFD700" />
               <Text style={styles.rating}>8.5M bookings</Text>
            </View>
            <TouchableOpacity style={styles.warranty} onPress={() => setModalVisible(true)}>
               <Icon name="checkmark-circle" size={30} color="#4CAF50" />
               <Text style={styles.warrantyText}>Upto 30 days warranty on repairs</Text>
               <Right name="caretright" size={25} color="black" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
         </View>

         {/* Service Cards */}

         <View style={styles.cardContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {serviceData.map((item) =>
                  <View style={styles.card} key={item.id}>
                     <Image
                        source={item.image}
                        style={styles.cardImage}
                     />
                     <Text style={styles.cardTitle}>{item.title}</Text>
                     <Text style={styles.cardPrice}>{item.price}</Text>
                     <TouchableOpacity style={styles.cardButton} onPress={() => { handleclick(item) }}>
                        <Text style={styles.cardButtonText}>Book Now</Text>
                     </TouchableOpacity>
                  </View>
               )}
            </ScrollView>
         </View>

         {/* Testimonials Section */}
         <View style={styles.testimonialSection}>
            <Text style={styles.sectionTitle}>Customer Testimonials</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {testimonialData.map((testimonial) => (
                  <View key={testimonial.id} style={styles.testimonialBox}>
                     <Text style={styles.testimonialText}>
                        "{testimonial.text}"
                     </Text>
                     <Text style={styles.testimonialAuthor}>- {testimonial.author}</Text>
                  </View>
               ))}
            </ScrollView>
         </View>
         {/* FAQ Section */}
         <View style={styles.faqSection}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            <Text style={styles.faqQuestion}>Q: How long does a Washing Machine repair take?</Text>
            <Text style={styles.faqAnswer}>A: Most repairs are completed within an hour.</Text>
            <Text style={styles.faqQuestion}>Q: Do you offer any warranty?</Text>
            <Text style={styles.faqAnswer}>
               A: Yes, we provide up to 30 days warranty on repairs.
            </Text>
         </View>

         {/* Why Choose Us Section */}
         <View style={styles.whyChooseUs}>
            <Text style={styles.sectionTitle}>Why Choose Us?</Text>
            <View style={styles.bulletPoint}>
               <Icon name="checkmark-circle" size={16} color="#4CAF50" />
               <Text style={styles.bulletText}>Trained & Verified Technicians</Text>
            </View>
            <View style={styles.bulletPoint}>
               <Icon name="checkmark-circle" size={16} color="#4CAF50" />
               <Text style={styles.bulletText}>Affordable Pricing</Text>
            </View>
            <View style={styles.bulletPoint}>
               <Icon name="checkmark-circle" size={16} color="#4CAF50" />
               <Text style={styles.bulletText}>Quick Service</Text>
            </View>
         </View>

         {/* Footer */}
         <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Washing Machine Services. All Rights Reserved.</Text>
         </View>

         {/* Modal */}
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
         >
            <View style={styles.modalOverlay}>
               <View style={styles.modalContent}>
                  <TouchableOpacity
                     onPress={() => setModalVisible(false)}
                     style={styles.closeButton}
                  >
                     <Text style={styles.closeText}>X</Text>
                  </TouchableOpacity>
                  <ScrollView>
                     <Text style={{ fontSize: 25, fontWeight: 600, marginBottom: 10, textAlign: 'center' }}>Fix Way</Text>
                     <Image
                        source={require('../../../img/blueright.jpg')} // Add your image path
                        style={styles.image}
                        resizeMode="contain"
                     />
                     {/* Content */}
                     <View style={styles.section}>
                        <Text style={styles.sectionHeader}>90-day warranty on repairs</Text>
                        <Text style={styles.sectionText}>
                           - Free repairs if the same issue arises.{"\n"}
                           - One-click hassle-free claims.{"\n"}
                           - Up to ₹10,000 cover if anything is damaged during the repair.
                        </Text>
                     </View>
                     <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Expert verified repair quotes</Text>
                        <Text style={styles.sectionText}>
                           - We will verify the repair quote shared by the professional.{"\n"}
                           - If you're still unsure, you can ask an expert for a second opinion.
                        </Text>
                     </View>
                     <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Fixed rate card</Text>
                        <Text style={styles.sectionText}>
                           - All our prices are decided based on market standards.{"\n"}
                           - If you are charged differently from the standard rate, you can
                           reach out to our help center.
                        </Text>
                     </View>
                  </ScrollView>
               </View>
            </View>
         </Modal>
      </ScrollView>


   );
};

export default WashingMachine;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   videoContainer: {
      width: '100%',
      height: 200,
   },
   video: {
      width: '100%',
      height: '100%',
   },
   titleSection: {
      padding: 16,
      backgroundColor: '#fff',
   },
   title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#333',
   },
   ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
   },
   rating: {
      marginLeft: 8,
      fontSize: 14,
      color: '#555',
      borderBottomWidth: 2,
      borderStyle: 'dotted',
      marginBottom: 10
   },
   warranty: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F1F7EE',
      height: 60,
      borderRadius: 10,
      padding: 10
   },
   warrantyText: {
      marginLeft: 8,
      color: 'black',
      fontSize: 14,
   },
   cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
      // margin: 10
   },
   card: {
      margin: 5,
      width: 140,
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'center',
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
   },
   cardImage: {
      width: '100%',
      height: 80,
      borderRadius: 8,
   },
   cardTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
      marginVertical: 8,
      textAlign: 'center'
   },
   cardPrice: {
      fontSize: 12,
      color: '#666',
   },
   cardButton: {
      marginTop: 10,
      backgroundColor: '#4CAF50',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
   },
   cardButtonText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
   },
   testimonialSection: {
      padding: 16,
   },
   sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
   },
   testimonialBox: {
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      margin: 10,
      width: 260
   },
   testimonialText: {
      fontSize: 14,
      color: '#333',
   },
   testimonialAuthor: {
      marginTop: 10,
      fontSize: 12,
      color: '#777',
      fontStyle: 'italic',
   },
   faqSection: {
      padding: 16,
   },
   faqQuestion: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8,
   },
   faqAnswer: {
      fontSize: 14,
      color: '#555',
      marginLeft: 10,
   },
   whyChooseUs: {
      margin: 16,
      backgroundColor: '#DEEECC',
      borderRadius: 10,
      padding: 10
   },
   bulletPoint: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
   },
   bulletText: {
      marginLeft: 8,
      fontSize: 14,
      color: '#555',
   },
   footer: {
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#ececec'
   },
   footerText: {
      fontSize: 12,
      color: '#aaa',
   },
   modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center'
   },
   modalContent: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      elevation: 5,
   },
   closeButton: {
      alignSelf: 'flex-end',
      padding: 10,
   },
   closeText: {
      fontSize: 30,
      fontWeight: '600',
      color: 'black',
   },
   image: {
      width: '100%',
      height: 150,
      marginBottom: 20,
   },
   section: {
      marginBottom: 20,
   },
   sectionHeader: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
   },
   sectionText: {
      textAlign: 'center',

      fontSize: 14,
      color: '#6c757d',
   },
});
