import LottieView from 'lottie-react-native';
import { Dimensions, Text, View } from 'react-native';
import { AppRouteParams } from '../navigators/AppNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';

const statusConfig = {
  valid: {
    text: 'Ticket is Valid 🎉',
    subText: 'You can enter the event',
    animation: require('../assets/animations/Check.json'),
  },
  used: {
    text: 'Ticket Already Used',
    subText: 'This ticket has already been scanned',
    animation: require('../assets/animations/Warning Status.json'),
  },
  invalid: {
    text: 'Invalid Ticket',
    subText: 'This ticket is not recognized',
    animation: require('../assets/animations/error.json'),
  },
};

const { width } = Dimensions.get('window');

const StatusScreen = () => {
  const { status } =
    useRoute<RouteProp<AppRouteParams, 'StatusScreen'>>()?.params;

  const config = statusConfig[status];

  return (
    <View className="flex-1 justify-center items-center bg-black-100">
      <LottieView
        source={config.animation}
        autoPlay
        style={{
          width: width * 0.3,
          height: width * 0.3,
          marginBottom: 8,
        }}
      />

      <Text className="font-medium text-white-100 text-lg">{config.text}</Text>
      <Text className="font-medium text-gray-100 text-sm">
        {config.subText}
      </Text>
    </View>
  );
};

export default StatusScreen;
