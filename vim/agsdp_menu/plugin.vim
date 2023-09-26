" custom_menu.vim

function! CustomMenu()
    let choice = input('Select an option (1/2/3): ')
    if choice == '1'
        execute 'Option1'
    elseif choice == '2'
        execute 'Option2'
    elseif choice == '3'
        execute 'Option3'
    else
        echo "Invalid choice"
    endif
endfunction

command! -nargs=0 ShowCustomMenu :call CustomMenu()

command! -bar -nargs=0 Option1 :terminal bash -c "clear; echo Option 1 selected"
command! -bar -nargs=0 Option2 :terminal bash -c "clear; echo Option 2 selected"
command! -bar -nargs=0 Option3 :terminal bash -c "clear; echo Option 3 selected"

