import { useState } from 'react';
import Config from 'react-native-config';
import { saveUser } from '../database/user';
import { Controller, useForm } from 'react-hook-form';
import { AppRouteParams } from '../navigators/AppNavigator';
import LoginHeaderImg from '../assets/images/loginHeader.png';
import { Dot, Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import {
  useNavigation,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const navigation = useNavigation<NavigationProp<AppRouteParams>>();

  const [focusField, setFocusField] = useState<null | 'email' | 'password'>(
    null,
  );

  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    if (
      data.email === Config.USER_EMAIL &&
      data.password === Config.USER_PASSWORD
    ) {
      await saveUser(data?.email);
      Alert.alert('Success', 'Login successful');
      navigation.dispatch(StackActions.replace('Root'));
    } else {
      Alert.alert('Invalid credentials', 'Your email or password is incorrect');
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-black-100" behavior="padding">
      <ScrollView
        bounces={false}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow pb-10 landscape:pb-20"
      >
        <View className="items-center gap-4 mt-28 mb-8">
          <View>
            <Image source={LoginHeaderImg} />
          </View>
          <View className="items-center">
            <Text className="font-bold text-white-100 text-3xl">
              Event Horizon
            </Text>
            <Text className="font-bold text-blue-100 text-3xl">Scanner</Text>
          </View>
          <Text className="items-center text-gray-100 text-sm">
            Optimize your night event entry flow
          </Text>
        </View>

        {/* form */}
        <View className="gap-6 m-6">
          <View className="gap-2">
            <Text className="text-gray-100 text-sm">Email </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`items-center gap-2 flex-row bg-transparent px-4 border rounded-xl ${
                    focusField === 'email'
                      ? 'border-blue-100'
                      : 'border-blue-500'
                  }`}
                >
                  <Mail size={16} color="#64748B" />
                  <TextInput
                    className="flex-1 text-white-100"
                    onBlur={() => setFocusField(null)}
                    onFocus={() => setFocusField('email')}
                    onChangeText={onChange}
                    value={value}
                    placeholder="name@eventhorizon.com"
                    placeholderTextColor="#64748B"
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text className="text-red-100 text-sm">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View className="gap-2">
            <Text className="text-gray-100 text-sm">Password </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`flex-row justify-between items-center bg-transparent px-4 border rounded-xl  ${
                    focusField === 'password'
                      ? 'border-blue-100'
                      : 'border-blue-500'
                  }`}
                >
                  <View className="flex-row flex-1 items-center gap-2">
                    <Lock size={16} color="#64748B" />
                    <TextInput
                      className="flex-1 text-white-100"
                      onBlur={() => setFocusField(null)}
                      onFocus={() => setFocusField('password')}
                      secureTextEntry={!passwordVisible}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter password"
                      placeholderTextColor="#64748B"
                    />
                  </View>
                  <Pressable
                    className="p-2"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <Eye size={16} color="#64748B" />
                    ) : (
                      <EyeOff size={16} color="#64748B" />
                    )}
                  </Pressable>
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-red-100 text-sm">
                {errors.password?.message}
              </Text>
            )}
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="justify-center items-center bg-blue-100 p-3 rounded-xl"
          >
            <Text className="text-white-100">Login</Text>
          </Pressable>
        </View>

        <View className="items-center">
          <Text className="font-light text-blue-100 text-sm">
            Forgot password?
          </Text>
        </View>
        <View className="flex-row justify-center items-center gap-4 my-2">
          <Dot color="#7CD558" size={30} />
          <Text className="-ml-6 text-[#64748B] text-sm">
            System ready for scanning
          </Text>
        </View>

        <View className="bg-gray-100 mx-6 my-2 border border-black-200" />

        <View className="items-center my-4">
          <Text className="text-gray-100 text-sm">
            Login using your
            <Text className="text-white-100"> Event Horizon</Text> account
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
