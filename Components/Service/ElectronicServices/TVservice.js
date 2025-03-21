import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/Ionicons';
import Right from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const TVservice = () => {
   const [modalVisible, setModalVisible] = useState(false);

   const navigation = useNavigation()
   const data = {
      TvService: [
         {
            id: 1,
            latitude: 22.6916,
            longitude: 72.8634,
            price: 200,
            serviceName: "TV Service Hub",
            location: "Near ABC Plaza, Ahmedabad, Gujarat",
            contactNumber: "+91 9123456780",
            amenities: [
               "Screen Cleaning",
               "Audio Adjustment",
               "Software Update",
               "Remote Configuration",
            ],
            workingHours: "10:00 AM - 8:00 PM",
            services: [
               "LED TV Maintenance",
               "LCD TV Servicing",
               "Smart TV Optimization",
               "Remote Troubleshooting",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Credit/Debit Cards",
            ],
            loyaltyProgram: "Free remote check on every 5th service",
            reviews: [
               {
                  customer: "Rahul Sharma",
                  rating: 4.5,
                  comment: "Efficient service and affordable pricing.",
               },
               {
                  customer: "Priya Patel",
                  rating: 4.7,
                  comment: "My TV is as good as new!",
               },
            ],
            rating: 4.6,
         },
         {
            id: 2,
            latitude: 22.3245,
            longitude: 73.1818,
            price: 250,
            serviceName: "Smart TV Care",
            location: "Sector 21, Gandhinagar, Gujarat",
            contactNumber: "+91 9212345678",
            amenities: [
               "Dust Removal",
               "Screen Brightness Adjustment",
               "Firmware Updates",
               "Sound Calibration",
            ],
            workingHours: "9:00 AM - 7:00 PM",
            services: [
               "OLED TV Maintenance",
               "Smart TV Diagnostics",
               "Software Patching",
               "Remote Configuration",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Bank Transfers",
            ],
            loyaltyProgram: "10% off for first-time users",
            reviews: [
               {
                  customer: "Anjali Rana",
                  rating: 4.8,
                  comment: "Quick and reliable service. Highly recommended!",
               },
               {
                  customer: "Vikram Joshi",
                  rating: 4.6,
                  comment: "Good value for money.",
               },
            ],
            rating: 4.7,
         },
         {
            id: 3,
            latitude: 22.6023,
            longitude: 72.8205,
            price: 250,
            serviceName: "Smart TV Care",
            location: "Sector 21, Gandhinagar, Gujarat",
            contactNumber: "+91 9212345678",
            amenities: [
               "Dust Removal",
               "Screen Brightness Adjustment",
               "Firmware Updates",
               "Sound Calibration",
            ],
            workingHours: "9:00 AM - 7:00 PM",
            services: [
               "OLED TV Maintenance",
               "Smart TV Diagnostics",
               "Software Patching",
               "Remote Configuration",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Bank Transfers",
            ],
            loyaltyProgram: "10% off for first-time users",
            reviews: [
               {
                  customer: "Anjali Rana",
                  rating: 4.8,
                  comment: "Quick and reliable service. Highly recommended!",
               },
               {
                  customer: "Vikram Joshi",
                  rating: 4.6,
                  comment: "Good value for money.",
               },
            ],
            rating: 4.7,
         },
      ],
      TvRepair: [
         {
            id: 1,
            latitude: 21.2808817,
            longitude: 70.212965,
            price: 300,
            serviceName: "TV Repair Pro",
            location: "Opposite Green Mall, Rajkot, Gujarat",
            contactNumber: "+91 9876543201",
            amenities: [
               "Screen Replacement",
               "Audio Issue Fix",
               "Power Board Repair",
               "Software Reset",
            ],
            workingHours: "9:00 AM - 6:00 PM",
            services: [
               "LED TV Repair",
               "LCD Panel Fix",
               "Display Issue Repair",
               "Software Upgradation",
            ],
            paymentMethods: [
               "Cash",
               "Credit Cards",
               "Mobile Wallets",
            ],
            loyaltyProgram: "10% discount for referrals",
            reviews: [
               {
                  customer: "Amit Desai",
                  rating: 4.8,
                  comment: "Fast and professional service. Highly recommended!",
               },
               {
                  customer: "Deepa Mehta",
                  rating: 4.3,
                  comment: "Solved my TV problem efficiently.",
               },
            ],
            rating: 4.6,
         },
         {
            id: 2,
            latitude: 21.4007817,
            longitude: 70.315875,
            price: 350,
            serviceName: "Reliable TV Repair",
            location: "Main Street, Bhavnagar, Gujarat",
            contactNumber: "+91 9345678902",
            amenities: [
               "Circuit Board Repair",
               "Color Distortion Fix",
               "Connectivity Repair",
               "Software Updates",
            ],
            workingHours: "8:30 AM - 7:00 PM",
            services: [
               "Plasma TV Repair",
               "Screen Flickering Solutions",
               "Connectivity Issue Repairs",
               "Advanced Diagnostics",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Digital Wallets",
            ],
            loyaltyProgram: "Free diagnostics for repeat customers",
            reviews: [
               {
                  customer: "Sneha Thakur",
                  rating: 4.9,
                  comment: "Excellent service and courteous staff.",
               },
               {
                  customer: "Arun Gupta",
                  rating: 4.7,
                  comment: "Solved a long-standing issue with my TV.",
               },
            ],
            rating: 4.8,
         },
      ],
      TvInstallation: [
         {
            id: 1,
            latitude: 21.3180,
            longitude: 70.2670,
            price: 500,
            serviceName: "TV Mount Experts",
            location: "Near City Center, Surat, Gujarat",
            contactNumber: "+91 8765432109",
            amenities: [
               "Wall Mounting",
               "Cable Management",
               "Position Adjustment",
               "Remote Setup",
            ],
            workingHours: "8:00 AM - 6:00 PM",
            services: [
               "Wall Mount Installation",
               "Table Stand Setup",
               "Concealed Wiring",
               "Smart TV Configuration",
            ],
            paymentMethods: [
               "Cash",
               "UPI",
               "Credit/Debit Cards",
            ],
            loyaltyProgram: "Free follow-up for alignment issues within 1 month",
            reviews: [
               {
                  customer: "Suresh Verma",
                  rating: 4.9,
                  comment: "Perfect installation with attention to detail.",
               },
               {
                  customer: "Kavita Shah",
                  rating: 4.8,
                  comment: "Very satisfied with the service.",
               },
            ],
            rating: 4.85,
         },
         {
            id: 2,
            latitude: 22.3258917,
            longitude: 71.295975,
            price: 550,
            serviceName: "Precision TV Installation",
            location: "Sector 12, Vadodara, Gujarat",
            contactNumber: "+91 9087654321",
            amenities: [
               "Precise Wall Mounting",
               "Cable Concealment",
               "Viewing Angle Optimization",
               "Power Stabilizer Setup",
            ],
            workingHours: "9:00 AM - 5:30 PM",
            services: [
               "Motorized Mount Installation",
               "Cable Length Optimization",
               "Advanced Smart TV Setup",
               "Custom Wiring Solutions",
            ],
            paymentMethods: [
               "Cash",
               "Digital Payments",
               "UPI",
            ],
            loyaltyProgram: "Discounted mounts for referrals",
            reviews: [
               {
                  customer: "Ravi Kumar",
                  rating: 4.8,
                  comment: "Very professional and efficient service.",
               },
               {
                  customer: "Manisha Chauhan",
                  rating: 4.6,
                  comment: "Neat and clean installation work.",
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
         text: "Excellent service! My TV was repaired within an hour. Highly recommend!",
         author: "John Doe",
      },
      {
         id: 2,
         text: "Fast and reliable! The technician was professional and fixed the issue quickly.",
         author: "Jane Smith",
      },
      {
         id: 3,
         text: "Great experience! My TV was fixed on the spot, and the customer service was top-notch.",
         author: "Michael Johnson",
      },
   ];


   const serviceData = [
      {
         id: 1,
         title: "TV Service",
         price: "Starting at ₹499",
         image: require("../../../img/TVService1.jpg"),
      },
      {
         id: 2,
         title: "TV Repair",
         price: "Quick Fixes",
         image: require("../../../img/TVService2.jpg"),

      },
      {
         id: 3,
         title: "TV Installation",
         price: "Affordable Setup",
         image: require("../../../img/TVService3.jpg"),

      },
   ];


   const handleclick = (item) => {
      console.log(item.id)
      if (item.id === 1) {
         navigation.navigate('BookingScreen', { type: 'TvService', data: data.TvService });
      } if (item.id === 2) {
         navigation.navigate('BookingScreen', { type: 'TvRepair', data: data.TvRepair });
      } if (item.id === 3) {
         navigation.navigate('BookingScreen', { type: 'TvInstallation', data: data.TvInstallation });
      }
   }
   return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
         {/* Video Section */}
         <View style={styles.videoContainer}>
            <Video
               source={require("../../../video/tvVideo.mp4")} // Replace with your video URL
               style={styles.video}
               resizeMode="cover"
               useNativeControls
               isLooping
               shouldPlay={true} // Enable autoplay
            />
         </View>

         {/* Title Section */}
         <View style={styles.titleSection}>
            <Text style={styles.title}>TV Repair & Service</Text>
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
            <Text style={styles.faqQuestion}>Q: How long does a TV repair take?</Text>
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
            <Text style={styles.footerText}>© 2025 TV Services. All Rights Reserved.</Text>
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

export default TVservice;

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
