import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';

import {firebaseApp} from '../../utils/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function ListReviews(props) {
    const { navigation, idRestaurant, setRating } = props;
    const [ reviews, setReviews] = useState([]);
    const [ reviewsReload, setReviewsReload] = useState(false);
    const [userLogged, setUserLogged] = useState(false);

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    console.log(reviews);

    useEffect(() => {

        (async () => {
        const resultReviews = [];
        const arrayRating = [];

        db.collection("reviews")
            .where("idRestaurant", "==", idRestaurant)
            .get()
            .then(response => {
                response.forEach(doc => {
                    resultReviews.push(doc.data());
                    arrayRating.push(doc.data().rating);
                });

                let numSum = 0;
                arrayRating.map(value => {
                    numSum = numSum + value;
                });
                const countRating = arrayRating.length;
                const resultRating = numSum / countRating;
                const resultRatingFinish = resultRating ? resultRating : 0;

                setReviews(resultReviews);
                setRating(resultRatingFinish);
            });
          setReviewsReload(false)
        }) ()
    }, [reviewsReload]);

    return (
        <View>

            {userLogged ? (
                <Button
                buttonStyle={styles.btnAddReview}
                titleStyle={styles.btnTitleAddReview}
                title="Escribir una opinion"
                icon={{
                    type: "material-community",
                    name: "square-edit-outline",
                    color: "#00a680"
                }}
                onPress={() => navigation.navigate("AddReviewRestaurant", {
                    idRestaurant: idRestaurant,
                    setReviewsReload: setReviewsReload,
                })
                }
            />) : (
                <View>
                    <Text 
                        style={{textAlign: "center", color: "#00a680", padding: 20}}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Para realizar un comentario es necesario estar logeado {" "}
                        <Text style={{fontWeight: "bold"}}>
                            Pulsa aqui para iniciar sesion
                        </Text>
                    </Text>
                </View>
            )}

            <FlatList
            data={reviews}
            renderItem={review => <Review review={review} />}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

function Review(props) {
    const {title, review, rating, createAt, avatarUser} = props.review.item;
    const dateCreateReview = new Date(createAt.seconds * 1000);

    return (
        <View style={styles.viewReview}> 
            <View style={styles.viewImagenAvatar}>
                <Avatar 
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={{uri: avatarUser ? avatarUser : "https://api.adorable.io/avatars/285/abott@adorable.png"}}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.reviewDate}>
                    {dateCreateReview.getDate()}/{dateCreateReview.getMonth() + 1}/
                    {dateCreateReview.getFullYear()} - {dateCreateReview.getHours()}:
                    {dateCreateReview.getMinutes() < 10 ? "0" : ""}
                    {dateCreateReview.getMinutes()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",
    },
    btnTitleAddReview: {
        color: "#00a680"
    },
    viewReview: {
        flexDirection: "row",
        margin: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewImagenAvatar: {
        marginRight: 15,
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: 'flex-start',
    },
    reviewTitle: {
        fontWeight: "bold", 
    },
    reviewText: {
        paddingTop: 2,
        color: "grey",
        marginBottom: 5,
    },
    reviewDate: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
})
