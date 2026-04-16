# avs-downloader

simple userscripts providing barebone anime downloader for animevietsub

there are 2 userscripts: one for fetching the playlist file and one that provides
the ui and download

this is to bypass the iframe same origin limitation after recent changes
(the website puts the player inside of an iframe)

it is required that both scripts are installed

# some rant

to the guy who said that the admin should block userscripts manager, yeah thats not
happening www

there are legitimate usage for this script, including offline watching, so i don't see
blocking userscripts provides any benefits to the admin whatsoever

besides, if the reason for blocking downloader is for stopping scrapers? theyre going to
found ways to bypass those in no time

# some backstories

i made this bc previously i created a python script for downloading anime
from the website that doesn't work very well bc of the strict cloudflare protection.
somehow when playing with the script and adding parallel downloading i got blocked
from the site for 1 week (lol).

bc of that i got pretty scared anyways so i decided to create this instead which
solves all the problems but makes mass downloading harder.

# notes

i have only tested this 1 time, but yeah it works. at first i was scared that they
would have block me again because of the unusual traffic but fuck yeah it works lol
i did not get block.

# tasks

- [x] parse the html page and manually get the m3u8 playlist instead of relying on jwplayer
- [ ] ranged chunks download
- [ ] parallel fetching (might be blocked idk)
