import { Avatar, Button, Divider, Flex, Heading, IconButton, Image, Menu, MenuButton, MenuItem, MenuList, useBreakpointValue } from "@chakra-ui/react";
import { VscMenu, VscHome, VscNotebook, VscSettingsGear, VscChevronDown } from 'react-icons/vsc'
import { useDisclosure } from "@chakra-ui/react"
import NavItem from './NavItem'
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom"
import { IsAuthed } from "./RequireAuth";

const classItems = [
    { name: 'Class 123456' },
    { name: 'Class 22' },
    { name: 'Class 323444' }
]

const NavItems = [
    { name: 'Home', icon: VscHome, to: '/'},
    { name: 'Classes', icon: VscNotebook, to: '/classes', classes: classItems},
    { name: 'Settings', icon: VscSettingsGear, to: '/settings' },
]

export default function SideNav() {
    
    //Router
    const navigate = useNavigate()

    const onSignOut = async function () {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        navigate('/login');
    };

    const { isOpen, onToggle } = useDisclosure();   
    const isWide = useBreakpointValue({sm: false, lg: true })

    // Collapse sidenav when button is toggled or is less than widescreen
    const open = !isOpen && isWide; 

    if (!IsAuthed()) {
        return;
    }

    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            mt="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={open ? "30px" : "15px"}
            w={open ? "200px" : "72px"}
            flexDir="column"
            justifyContent="space-between"
            display={{base: 'none', sm: 'flex'}}
            bg='blackAlpha.200'
        >
            {/* Upper/Middle Portion */}
            <Flex
                p="5%"
                flexDir="column"
                alignItems={open ? "flex-start" : "center"}
                as="nav"
            >
                {/* Logos for expanded and compact sidebar */}
                <Image mt={4} src='/qena192.png' display={open ? "flex" : "none"}/>
                <Image mt={4} src='/qena64.png' display={open ? "none" : "flex"}/>
                {/* Hamburger button */}
                <IconButton
                    background="none"
                    mt={2}
                    _hover={{ background: 'none' }}
                    icon={<VscMenu />}
                    onClick={onToggle}
                    display={isWide ? 'flex' : 'none'}
                />
                {/* Pages */}
                {NavItems.map(item => {
                    let classes = item.classes || [];
                    return ( 
                        <NavItem 
                            key={item.name}
                            name={item.name}
                            icon={item.icon} 
                            open={open} 
                            to={item.to}
                            classes={classes}
                        /> 
                    )
                })}

            </Flex>
            {/* Lower Portion */}
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={open ? "flex-start" : "center"}
                mb={4}
            >
                <Divider mb={4} orientation='horizontal' display={open ? "flex" : "none"} />
                {/* User Info Menu*/}
                <Menu>
                    <MenuButton 
                        as={Button} 
                        rightIcon={<VscChevronDown />} 
                        bg='transparent'
                    >
                        <Flex align="center" >
                            {/* 
                                Avatar becomes the initials of user. 
                                We don't need custom avatars 
                                Username will be from session info
                            */}
                            <Avatar name='User Name' size="sm" src='https://brokenlink.sdf' /> 
                            <Flex 
                                flexDir="column" 
                                ml={4} 
                                display={open ? "flex" : "none"}
                            > 
                                <Heading as="h3" size="sm"> {/* Long names need fixing */}
                                    User Name
                                </Heading> 
                            </Flex>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={() => onSignOut()}>Sign out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
        
    );
}

