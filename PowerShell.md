<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

# PowerShell

## <r>PowerShell commands</r>

[Table of basic powershell commands](https://devblogs.microsoft.com/scripting/table-of-basic-powershell-commands/)
[Powershell docs](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/?view=powershell-7.2)

#### <g>Navigate</g>

Set current working location to a specified location

```shell
cd 'C:\Users\risos\Programming\notes\'
```

#### <g>Create</g>

Create new item

```shell
New-Item -Path . -Name 'test.txt' -Value 'this is it'
```

#### <g>Modify</g>

Create new directory

```shell
mkdir test
```

Copy an item from one location to another.

```shell
copy test.txt -Destination 'C:\Users\risos\Programming\notes\'
```

Delete item

```shell
del test.txt
```

Move item

```shell
move test.txt -Destination 'C:\Users\risos\Desktop\'
```

Rename item

```shell
Rename-Item test.txt kkt.txt
```

#### <g>List</g>

Get files and folders in a file system drive.

```shell
ls --fo
```

`--foo` flag shows all files including hidden ones. For example `.git` folder.
