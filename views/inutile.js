const [location, setLocation] = useState();
const [initialRegion, setInitialRegion] = useState();


useEffect(() => { // Get user Location (20 lignes)
    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if ( status !== 'granted') {
            console.log("Please grant location permissions");
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);

    };
    getPermissions();
}, []);
