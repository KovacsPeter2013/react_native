import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './Routes';


export const UserContext = React.createContext();
export const ProfileContext = React.createContext();
export const ServicesContext = React.createContext([]);


const App = ()=> {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [services, setServices] = useState();

  return (
  <SafeAreaProvider>
{/* Figyelem. Nem csak a user adatok,de maga a funkció is átpasszolható egy másik komponensnek, oldalnak.... */}
  <UserContext.Provider value={{user, setUser}}>

 {/* Figyelem, ProfileContext magyarázat:
 A ProfileContext és a UserContext az alkalmazásban kontextusobjektumokat hoz létre, amelyek adatokat és 
 függvényeket tesznek elérhetővé a komponensek számára. Ezek az adatok és függvények globálisan hozzáférhetők az alkalmazásban,
és különböző komponensek közötti adatáramlást tesznek lehetővé.

Az App.js fájlban a ProfileContext-ben és a UserContext-ben tárolt adatokat és függvényeket nyújtja az alkalmazás egészében. 
A setProfile függvény segítségével az alkalmazás más részei beállíthatják és frissíthetik a profiladatokat.

A Profil.js fájlban a ProfileContext-ból a useContext hook segítségével lekéri a profile és setProfile változókat. 
Ezek az adatok és függvények hozzáférést biztosítanak a profiladatokhoz és azok frissítéséhez. 
A useEffect hook használatával inicializálja a profiladatokat, amikor a komponens mountolódik.

A Profil komponensben a profile adatokat a <Text> komponensekben jeleníti meg a profile?.name és profile?.email kifejezések segítségével.
Ez azt jelenti, hogy ha a profile értéke nem null vagy undefined, akkor megjeleníti a nevet és az e-mailt.
 A profile adatokat az await getProfile() hívással kéri le az API-tól, majd a setProfile függvényt használja 
 az adatok beállítására a ProfileContext-ben.

Ezáltal a ProfileContext biztosítja az adatáramlást az App.js és a Profil.js között, 
lehetővé téve a profiladatok lekérését és megjelenítését a Profil komponensben. */}

    <ProfileContext.Provider value={{profile, setProfile}}>
    <ServicesContext.Provider value={{services, setServices}}>
      <Routes />
   </ServicesContext.Provider>
   </ProfileContext.Provider>
  </UserContext.Provider>
</SafeAreaProvider>
 );
}
export default App;
