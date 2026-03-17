import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/store';
import { ChevronLeft } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';
import { AppRouteParams } from '../navigators/AppNavigator';
import { selectSyncState } from '../redux/slices/syncSlice';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { markTicketUsed, validateTicket } from '../database/ticketService';
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

const Scanner = () => {
  const isFocused = useIsFocused();
  const device = useCameraDevice('back');
  const [scanned, setScanned] = useState(false);
  const syncState = useAppSelector(selectSyncState);
  const [hasPermission, setHasPermission] = useState(false);
  const navigation = useNavigation<NavigationProp<AppRouteParams>>();

  const verifyTicket = async (ticketId: string) => {
    const result = await validateTicket(ticketId);

    if (result.valid) {
      await markTicketUsed(ticketId);
      navigation.navigate('StatusScreen', { status: 'valid' });
    } else {
      navigation.navigate('StatusScreen', { status: result.status });
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'upc-a'],
    onCodeScanned: codes => {
      if (scanned) return;

      const value = codes[0]?.value;
      if (value) {
        setScanned(true);
        verifyTicket(value);
      }
    },
  });

  useEffect(() => {
    const getPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };

    getPermission();
  }, []);

  useEffect(() => {
    if (isFocused) {
      setScanned(false);
    }
  }, [isFocused]);

  if (!device || !hasPermission) return null;

  if (syncState) {
    return (
      <View className="flex-1 justify-center items-center gap-4 bg-black-100">
        <ActivityIndicator size={'large'} color="#3A5F7E" />
        <Text className="font-bold text-gray-100 text-lg">
          Syncing Tickets, Please wait.....
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black-100">
      <View className="z-20 flex-row items-center bg-black px-3 border-neutral-700 border-b h-16">
        <ChevronLeft
          size={22}
          color={'#fff'}
          onPress={() => navigation.goBack()}
        />
        <View className="flex-1 items-center">
          <Text className="font-bold text-white-100 text-base">
            Event Horizon Scanner
          </Text>
        </View>
      </View>

      <View className="flex-1 justify-center items-center">
        <View className="relative border-none rounded-lg w-72 h-72 overflow-hidden">
          <Camera
            device={device}
            isActive={true}
            style={{ flex: 1 }}
            codeScanner={codeScanner}
          />

          <View className="top-0 left-0 absolute border-blue-100 border-t-4 border-l-4 rounded-tl-lg w-10 h-10" />
          <View className="top-0 right-0 absolute border-blue-100 border-t-4 border-r-4 rounded-tr-lg w-10 h-10" />
          <View className="bottom-0 left-0 absolute border-blue-100 border-b-4 border-l-4 rounded-bl-lg w-10 h-10" />
          <View className="right-0 bottom-0 absolute border-blue-100 border-r-4 border-b-4 rounded-br-lg w-10 h-10" />
        </View>

        <Text className="mt-6 text-gray-100 text-sm">
          Align QR code within the frame
        </Text>
      </View>
    </View>
  );
};

export default Scanner;
