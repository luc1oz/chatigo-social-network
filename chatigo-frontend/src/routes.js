import AuthBlock from "./components/AuthBlock";
import ChatsBlock from "./components/ChatsBlock";
import FriendsBlock from "./components/FriendsBlock";
import MyPageBlock from "./components/MyPageBlock";
import NewsBlock from "./components/NewsBlock";
import RegBlock from "./components/RegBlock";
import UserBlock from "./components/UserBlock";
import MessengerBlock from "./components/MessengerBlock"
import { LOGIN_ROUTE, MESSENGER_ROUTE, REG_ROUTE, NEWS_ROUTE, FRIENDS_ROUTE, USER_ROUTE, CHATS_ROUTE, EDIT_ROUTE, SETTINGS_ROUTE, STANDART_PUBLIC_ROUTE, STANDART_PRIVATE_ROUTE } from "./utils/consts";
import EditProfileBlock from "./components/EditProfileBlock";
import SettingsBlock from "./components/SettingsBlock";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthBlock
    },
    {
        path: REG_ROUTE,
        Component: RegBlock
    },
    {
        path: STANDART_PUBLIC_ROUTE,
        Component: AuthBlock
    },
]

export const privateRoutes = [
    {
        path: NEWS_ROUTE,
        Component: NewsBlock
    },
    {
        path: FRIENDS_ROUTE,
        Component: FriendsBlock
    },
    {
        path: USER_ROUTE,
        Component: MyPageBlock
    },
    {
        path: MESSENGER_ROUTE,
        Component: MessengerBlock
    },
    {
        path: CHATS_ROUTE,
        Component: ChatsBlock
    },
    {
        path: EDIT_ROUTE,
        Component: EditProfileBlock
    },
    {
        path: SETTINGS_ROUTE,
        Component: SettingsBlock
    },
    {
        path: STANDART_PRIVATE_ROUTE,
        Component: NewsBlock
    },
]