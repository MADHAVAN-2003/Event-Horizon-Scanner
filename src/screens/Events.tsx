import { useState } from 'react';
import Events from '../constants/event';
import { logout } from '../database/user';
import ProfileImg from '../assets/images/profile.png';
import { AppRouteParams } from '../navigators/AppNavigator';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  NavigationProp,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import {
  CalendarOff,
  ChevronRight,
  LogOut,
  LucideCalendarClock,
} from 'lucide-react-native';
import {
  Text,
  View,
  Image,
  Pressable,
  SectionList,
  useWindowDimensions,
} from 'react-native';

const CurrentEvents = () => {
  return (
    <SectionList
      sections={Events}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-60"
      bounces={false}
      renderSectionHeader={({ section }) => (
        <View className="my-2">
          <View className="px-4 py-2">
            <Text className="font-bold text-blue-100 text-sm tracking-widest">
              {section.title}
            </Text>
          </View>

          <View className="mt-2 border border-t-blue-200" />
        </View>
      )}
      renderItem={({ item }) => (
        <View className="flex-row">
          <View className="items-center w-10">
            <View className="flex-1 bg-blue-200 w-[2px]" />
            <View className="top-1/2 absolute bg-gray-100 border-2 border-blue-300 rounded-full w-4 h-4" />
          </View>

          <View className="flex-1 my-4">
            <View className="flex-row justify-between items-center bg-blue-400 mx-2 px-4 py-3 border border-blue-200 rounded-xl h-24">
              <View className="flex-row items-center gap-4">
                <View className="justify-center items-center bg-[#141C28] p-4 border rounded-xl">
                  <LucideCalendarClock size={24} color="#3A5F7E" />
                </View>

                <View className="gap-1">
                  <Text className="font-medium text-white-100 text-lg">
                    {item.title}
                  </Text>
                  <Text className="text-gray-100 text-sm">{item.location}</Text>
                </View>
              </View>

              <ChevronRight size={24} color="#94A3B8" />
            </View>
          </View>
        </View>
      )}
    />
  );
};

const PastEvents = () => {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <View className="bg-blue-200 p-4 rounded-full">
        <CalendarOff size={24} color="#3A5F7E" />
      </View>
      <Text className="text-gray-100">Sorry , There is no Past Events</Text>
    </View>
  );
};

const renderScene = SceneMap({
  currentEvent: CurrentEvents,
  pastEvent: PastEvents,
});

const routes = [
  { key: 'currentEvent', title: 'Current Events' },
  { key: 'pastEvent', title: 'Past Events' },
];

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: '#3A5F7E' }}
    style={{
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderBottomColor: '#1E293B',
    }}
    activeColor="#3A5F7E"
  />
);

const Event = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<AppRouteParams>>();

  const handleLogout = async () => {
    await logout();
    navigation.dispatch(StackActions.replace('Login'));
  };
  return (
    <View className="flex-1 bg-black-100">
      <View className="flex-row justify-between items-center px-4 py-2 border-blue-200 border-b h-16">
        <View className="w-12 h-12">
          <Image
            source={ProfileImg}
            style={{ height: '100%', width: '100%' }}
          />
        </View>

        <View>
          <Text className="font-bold text-white-100">My Events</Text>
        </View>
        <Pressable className="py-2" onPress={handleLogout}>
          <LogOut color="#F1F5F9" size={18} />
        </Pressable>
      </View>

      <TabView
        renderScene={renderScene}
        onIndexChange={setIndex}
        navigationState={{ index, routes }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default Event;
